import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// 이미지 분석 기반 카메라 기능 관리
const useCamera = () => {
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const silhouetteCanvasRef = useRef(document.createElement('canvas')); // 실루엣 분석용 캔버스
	const [isCameraOn, setIsCameraOn] = useState(false);
	const [cameraError, setCameraError] = useState(null);
	const [capturedImage, setCapturedImage] = useState(null);
	const [facingMode, setFacingMode] = useState('environment');
	const [isFlipped, setIsFlipped] = useState(false);
	const [personDetected, setPersonDetected] = useState(false);
	const [detectionPercentage, setDetectionPercentage] = useState(0);
	const [detectionActive, setDetectionActive] = useState(false);
	const [poseDetector, setPoseDetector] = useState(null);

	// 이미지 분석 결과 저장
	const [silhouetteMap, setSilhouetteMap] = useState(null);
	const [silhouetteLoaded, setSilhouetteLoaded] = useState(false);
	const navigate = useNavigate();

	// 카메라 시작
	const startCamera = async () => {
		try {
			const constraints = {
				video: {
					facingMode: facingMode,
				},
			};

			const stream = await navigator.mediaDevices.getUserMedia(constraints);

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				setIsCameraOn(true);
				setCameraError(null);
			}
		} catch (error) {
			console.error('카메라 접근 에러:', error);
			setCameraError('카메라에 접근할 수 없습니다. 권한을 확인해주세요.');
		}
	};

	// 카메라 종료
	const stopCamera = () => {
		if (videoRef.current && videoRef.current.srcObject) {
			const tracks = videoRef.current.srcObject.getTracks();
			tracks.forEach(track => track.stop());
			videoRef.current.srcObject = null;
			setIsCameraOn(false);
		}
	};

	// 실루엣 이미지 분석
	const analyzeSilhouetteImage = imagePath => {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = 'Anonymous'; // CORS 이슈 방지

			img.onload = () => {
				// 캔버스 설정
				const canvas = silhouetteCanvasRef.current;
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx = canvas.getContext('2d');

				// 이미지 그리기
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0);

				// 픽셀 데이터 가져오기
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				const data = imageData.data;

				// 이미지를 영역별로 분석 (상단/중단/하단 및 좌/중/우)
				// 각 영역별 불투명 픽셀의 분포도 계산
				const regionMap = createRegionMap(data, canvas.width, canvas.height);

				// 이미지 분석 완료
				setSilhouetteMap(regionMap);
				setSilhouetteLoaded(true);
				resolve(regionMap);
			};

			img.onerror = error => {
				console.error('실루엣 이미지 로드 실패:', error);
				reject(error);
			};

			img.src = imagePath;
		});
	};

	// 이미지 영역 맵 생성
	const createRegionMap = (imageData, width, height) => {
		// 이미지를 9개 영역으로 나눔 (3x3 그리드)
		const regions = {
			topLeft: { pixels: [], opacity: 0 },
			topCenter: { pixels: [], opacity: 0 },
			topRight: { pixels: [], opacity: 0 },
			middleLeft: { pixels: [], opacity: 0 },
			middleCenter: { pixels: [], opacity: 0 },
			middleRight: { pixels: [], opacity: 0 },
			bottomLeft: { pixels: [], opacity: 0 },
			bottomCenter: { pixels: [], opacity: 0 },
			bottomRight: { pixels: [], opacity: 0 },
		};

		// 각 영역의 크기
		const regionWidth = width / 3;
		const regionHeight = height / 3;

		// 각 픽셀이 어느 영역에 속하는지, 그리고 불투명도 계산
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const index = (y * width + x) * 4;
				const alpha = imageData[index + 3]; // 알파 채널 (0-255)

				if (alpha > 20) {
					// 어느 정도 불투명한 픽셀만 고려
					// 픽셀이 속한 영역 결정
					const regionX = Math.floor(x / regionWidth);
					const regionY = Math.floor(y / regionHeight);

					let regionKey;
					if (regionY === 0) {
						if (regionX === 0) regionKey = 'topLeft';
						else if (regionX === 1) regionKey = 'topCenter';
						else regionKey = 'topRight';
					} else if (regionY === 1) {
						if (regionX === 0) regionKey = 'middleLeft';
						else if (regionX === 1) regionKey = 'middleCenter';
						else regionKey = 'middleRight';
					} else {
						if (regionX === 0) regionKey = 'bottomLeft';
						else if (regionX === 1) regionKey = 'bottomCenter';
						else regionKey = 'bottomRight';
					}

					// 정규화된 좌표 (0-1 범위)
					const normX = x / width;
					const normY = y / height;

					regions[regionKey].pixels.push({ x: normX, y: normY, alpha: alpha / 255 });
					regions[regionKey].opacity += alpha;
				}
			}
		}

		// 각 영역의 평균 불투명도 계산
		for (const key in regions) {
			if (regions[key].pixels.length > 0) {
				regions[key].opacity /= regions[key].pixels.length * 255;
			}

			// 각 영역의 중심점 계산
			if (regions[key].pixels.length > 0) {
				let sumX = 0,
					sumY = 0;
				for (const pixel of regions[key].pixels) {
					sumX += pixel.x;
					sumY += pixel.y;
				}
				regions[key].centerX = sumX / regions[key].pixels.length;
				regions[key].centerY = sumY / regions[key].pixels.length;
			}
		}

		// 키포인트 영역 매핑 (어느 키포인트가 어느 영역에 있어야 하는지)
		const keypointMapping = {
			// 얼굴 부분
			0: ['topCenter'], // 코
			1: ['topCenter'], // 왼쪽 눈
			2: ['topCenter'], // 오른쪽 눈
			3: ['topLeft', 'topCenter'], // 왼쪽 귀
			4: ['topRight', 'topCenter'], // 오른쪽 귀

			// 어깨 부분
			11: ['middleLeft', 'topLeft'], // 왼쪽 어깨
			12: ['middleRight', 'topRight'], // 오른쪽 어깨

			// 팔 부분
			13: ['middleLeft'], // 왼쪽 팔꿈치
			14: ['middleRight'], // 오른쪽 팔꿈치
			15: ['bottomLeft'], // 왼쪽 손목
			16: ['bottomRight'], // 오른쪽 손목
		};

		return { regions, keypointMapping };
	};

	// 키포인트가 실루엣에 맞는지 확인
	const checkLandmarksMatchSilhouette = (landmarks, silhouetteMap) => {
		if (!landmarks || landmarks.length === 0 || !silhouetteMap) return 0;

		const { regions, keypointMapping } = silhouetteMap;
		let matchedPoints = 0;
		let totalPoints = 0;

		// 각 키포인트가 매핑된 영역 내에 있는지 확인
		for (const [keypointIndex, allowedRegions] of Object.entries(keypointMapping)) {
			const keypoint = landmarks[parseInt(keypointIndex)];

			if (keypoint && keypoint.visibility > 0.5) {
				totalPoints++;
				const { x, y } = keypoint;

				// 이 키포인트가 허용된 영역 중 하나에 있는지 확인
				for (const regionKey of allowedRegions) {
					const region = regions[regionKey];

					// 해당 영역에 픽셀이 있는지 확인
					if (region.pixels.length > 0) {
						// 키포인트와 가장 가까운 픽셀 찾기
						let minDistance = Infinity;
						for (const pixel of region.pixels) {
							const distance = Math.sqrt(Math.pow(x - pixel.x, 2) + Math.pow(y - pixel.y, 2));
							minDistance = Math.min(minDistance, distance);
						}

						// 임계값 이내에 있으면 매치된 것으로 간주
						// 이 값은 조정 필요 (0.1 = 이미지 크기의 10% 내)
						if (minDistance < 0.15) {
							matchedPoints++;
							break; // 하나의 영역에 매치되면 충분
						}
					}
				}
			}
		}

		// 매치율 계산 (백분율)
		return totalPoints > 0 ? Math.round((matchedPoints / totalPoints) * 100) : 0;
	};

	// MediaPipe Pose 모델 초기화
	const initPoseDetection = async () => {
		try {
			// 이미 감지기가 있으면 재사용
			if (poseDetector) {
				setDetectionActive(true);
				return;
			}

			// 실루엣 이미지 분석 (이미 분석되어 있지 않으면)
			if (!silhouetteLoaded) {
				await analyzeSilhouetteImage('/images/upperbody2.png');
			}

			// MediaPipe Pose 모델 로드
			const pose = await import('@mediapipe/pose');
			const drawingUtils = await import('@mediapipe/drawing_utils');
			const camera = await import('@mediapipe/camera_utils');

			// 감지기 초기화
			const detector = new pose.Pose({
				locateFile: file => {
					return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
				},
			});

			// 설정
			await detector.setOptions({
				modelComplexity: 1,
				smoothLandmarks: true,
				minDetectionConfidence: 0.5,
				minTrackingConfidence: 0.5,
			});

			// 결과 콜백
			detector.onResults(results => {
				if (results.poseLandmarks) {
					// 실루엣 이미지와 키포인트 매칭 검사
					const matchPercentage = checkLandmarksMatchSilhouette(results.poseLandmarks, silhouetteMap);

					setDetectionPercentage(matchPercentage);
					setPersonDetected(matchPercentage >= 45); // 45% 이상 매치되면 검출 성공
				} else {
					setPersonDetected(false);
					setDetectionPercentage(0);
				}
			});

			setPoseDetector(detector);
			setDetectionActive(true);

			// 자동 감지 시작
			startDetection(detector);
		} catch (error) {
			console.error('MediaPipe 로드 오류:', error);
			setCameraError('사람 감지 기능을 로드하는 데 실패했습니다.');
		}
	};

	// 감지 기능 시작
	const startDetection = detector => {
		if (!videoRef.current || !detector) return;

		const detectFrame = async () => {
			if (!videoRef.current || !isCameraOn || !detectionActive) return;

			try {
				// 현재 비디오 프레임 전달
				await detector.send({ image: videoRef.current });

				// 다음 프레임
				if (isCameraOn && detectionActive) {
					requestAnimationFrame(detectFrame);
				}
			} catch (error) {
				console.error('프레임 감지 오류:', error);
			}
		};

		// 감지 루프 시작
		detectFrame();
	};

	// 다른 기본 기능들 (카메라 전환, 좌우 반전, 사진 촬영 등)
	const switchCamera = async () => {
		// 현재 카메라 중지
		if (videoRef.current && videoRef.current.srcObject) {
			const tracks = videoRef.current.srcObject.getTracks();
			tracks.forEach(track => track.stop());
			videoRef.current.srcObject = null;
		}

		// facingMode 변경
		const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
		setFacingMode(newFacingMode);

		try {
			// 새 카메라 시작
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: newFacingMode,
				},
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				setIsCameraOn(true);
				setCameraError(null);
			}
		} catch (error) {
			console.error('카메라 전환 에러:', error);
			setCameraError('카메라 전환에 실패했습니다.');
		}
	};

	// 좌우 반전 토글
	const toggleFlip = () => {
		setIsFlipped(prev => !prev);
	};

	// 사진 촬영
	const capturePhoto = () => {
		console.log('캡처 시작', {
			videoRef: !!videoRef.current,
			canvasRef: !!canvasRef.current,
			isCameraOn,
		});

		if (!videoRef.current) {
			console.error('비디오 요소가 없습니다');
			return null;
		}

		if (!canvasRef.current) {
			console.error('캔버스 요소가 없습니다');
			return null;
		}

		if (!isCameraOn) {
			console.error('카메라가 켜져있지 않습니다');
			return null;
		}

		if (videoRef.current && canvasRef.current && isCameraOn) {
			const video = videoRef.current;
			const canvas = canvasRef.current;
			const context = canvas.getContext('2d');

			if (!context) {
				console.error('캔버스 컨텍스트를 가져올 수 없습니다');
				return null;
			}

			// 비디오 크기
			const videoWidth = video.videoWidth;
			const videoHeight = video.videoHeight;

			// 3:4 비율로 캔버스 설정
			canvas.width = Math.min(videoWidth, videoHeight * 0.75);
			canvas.height = Math.min(videoHeight, videoWidth * 1.33);
			console.log('비디오 크기', { videoWidth, videoHeight });

			// 캔버스 초기화
			context.clearRect(0, 0, canvas.width, canvas.height);

			// 중앙에서 캡처
			const sourceX = (videoWidth - canvas.width) / 2;
			const sourceY = (videoHeight - canvas.height) / 2;
			console.log('소스 위치', { sourceX, sourceY });

			// 좌우 반전 적용
			if (isFlipped) {
				context.save();
				context.scale(-1, 1);
				context.drawImage(
					video,
					sourceX,
					sourceY,
					canvas.width,
					canvas.height,
					-canvas.width,
					0,
					canvas.width,
					canvas.height,
				);
				context.restore();
			} else {
				context.drawImage(video, sourceX, sourceY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
			}

			const imageData = canvas.toDataURL('image/jpeg', 0.9);
			console.log(
				'이미지 데이터 생성 완료',
				imageData ? `길이: ${imageData.length}, 시작: ${imageData.substring(0, 30)}...` : '실패',
			);

			setCapturedImage(imageData);

			return imageData;
		}
		return null;
	};

	// 사진 전송
	const sendPhotoToBackend = async () => {
		const imageData = capturedImage;

		console.log(imageData);
		if (!imageData) {
			console.error('이미지 캡처 실패: 이미지 데이터가 없습니다');
			return null;
		}
		try {
			// 이미지 데이터를 Blob으로 변환
			if (!imageData) {
				console.error('이미지 캡처 실패: 이미지 데이터가 없습니다');
				return null;
			}
			// Base64 이미지 데이터를 Blob으로 직접 변환
			// Data URL 형식: data:image/jpeg;base64,/9j/4AAQ...
			const base64Data = imageData.split(',')[1];
			const byteCharacters = atob(base64Data);
			const byteArrays = [];
			for (let i = 0; i < byteCharacters.length; i += 512) {
				const slice = byteCharacters.slice(i, i + 512);
				const byteNumbers = new Array(slice.length);

				for (let j = 0; j < slice.length; j++) {
					byteNumbers[j] = slice.charCodeAt(j);
				}

				byteArrays.push(new Uint8Array(byteNumbers));
			}
			// Blob 생성
			const blob = new Blob(byteArrays, { type: 'image/jpeg' });
			console.log('이미지 변환 완료:', blob.type, blob.size, '바이트');

			// 현재 시간을 파일명에 포함시켜 유니크한 파일명 생성
			const timestamp = new Date().getTime();
			const filename = `capture_${timestamp}.jpg`;

			const formData = new FormData();

			// FormData 생성 및 이미지 추가
			formData.append('file', blob, filename);
			console.log('S3 업로드 요청 준비 완료, 파일명:', filename);

			console.log('S3 업로드 요청 시작:', formData);

			// 백엔드로 전송
			const serverResponse = await fetch('https://api.posepik.store/api/s3/upload', {
				method: 'POST',
				body: formData,
			});
			console.log(serverResponse);
			console.log('서버 응답 상태:', serverResponse.status, serverResponse.statusText);

			if (!serverResponse.ok) {
				let errorMessage;
				try {
					// 오류 응답 본문이 JSON인 경우
					const errorData = await serverResponse.json();
					errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
				} catch {
					// JSON이 아닌 경우 텍스트로 읽기 시도
					try {
						errorMessage = await serverResponse.text();
					} catch {
						errorMessage = serverResponse.statusText;
					}
				}
				throw new Error(`서버 응답 에러(${serverResponse.status}): ${errorMessage}`);
			}
			// 업로드된 파일 URL 반환
			const result = await serverResponse.text();
			console.log('S3 업로드 성공:', result);
			navigate('/camera-result/:2');
			return result;
		} catch (error) {
			console.error('S3 업로드 에러:', error);
			return null;
		}
	};

	// 컴포넌트 마운트 시 실행
	useEffect(() => {
		// 실루엣 이미지 미리 분석
		analyzeSilhouetteImage('/images/upperbody2.png')
			.then(() => {
				console.log('실루엣 이미지 분석 완료');
				// 카메라 시작
				startCamera();
			})
			.catch(error => {
				console.error('실루엣 분석 에러:', error);
				setCameraError('실루엣 이미지를 분석하는 데 실패했습니다.');
			});

		// 언마운트 시
		return () => {
			stopCamera();
			setDetectionActive(false);
		};
	}, []);

	// 카메라가 켜지면 감지 시작
	useEffect(() => {
		if (isCameraOn && silhouetteLoaded) {
			initPoseDetection();
		}
	}, [isCameraOn, silhouetteLoaded]);

	// 감지기가 설정되면 감지 시작
	useEffect(() => {
		if (poseDetector && isCameraOn && detectionActive) {
			startDetection(poseDetector);
		}
	}, [poseDetector, isCameraOn, detectionActive]);

	return {
		videoRef,
		canvasRef,
		isCameraOn,
		cameraError,
		capturedImage,
		isFlipped,
		personDetected,
		detectionPercentage,
		detectionActive,
		startCamera,
		stopCamera,
		capturePhoto,
		sendPhotoToBackend,
		switchCamera,
		toggleFlip,
		silhouetteLoaded,
	};
};

export default useCamera;
