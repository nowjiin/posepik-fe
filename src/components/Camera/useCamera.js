import { useState, useEffect, useRef } from 'react';

// 카메라 기능 관리
// 카메라 시작/종료, 촬영, 사람 감지
const useCamera = () => {
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [isCameraOn, setIsCameraOn] = useState(false);
	const [cameraError, setCameraError] = useState(null);
	const [capturedImage, setCapturedImage] = useState(null);
	const [facingMode, setFacingMode] = useState('environment'); // 'user' (전면) 또는 'environment' (후면)
	const [isFlipped, setIsFlipped] = useState(false); // 좌우 반전 상태
	const [personDetected, setPersonDetected] = useState(false); // 프레임 내 사람 감지 여부
	const [detectionActive, setDetectionActive] = useState(false); // 감지 기능 활성화 여부
	const [poseDetector, setPoseDetector] = useState(null); // MediaPipe Pose 감지기
	const [detectionPercentage, setDetectionPercentage] = useState(0); // 감지된 키포인트 비율

	// 카메라 시작
	const startCamera = async () => {
		try {
			// 3:4 비율로 설정 (세로가 긴 형태)
			const constraints = {
				video: {
					facingMode: facingMode,
				},
			};

			// 카메라 스트림 요청
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

	// 카메라 전환 (전면/후면)
	const switchCamera = async () => {
		// 현재 실행 중인 카메라 스트림을 중지
		if (videoRef.current && videoRef.current.srcObject) {
			const tracks = videoRef.current.srcObject.getTracks();
			tracks.forEach(track => track.stop());
			videoRef.current.srcObject = null;
		}

		// facingMode 상태 즉시 변경
		const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
		setFacingMode(newFacingMode);

		try {
			// 새로운 facingMode로 카메라 직접 시작
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

	// 사진 촬영 (반전 상태 고려)
	const capturePhoto = () => {
		if (videoRef.current && canvasRef.current && isCameraOn) {
			const video = videoRef.current;
			const canvas = canvasRef.current;
			const context = canvas.getContext('2d');

			// 비디오 크기 가져오기
			const videoWidth = video.videoWidth;
			const videoHeight = video.videoHeight;

			// 세로 모드에 맞게 3:4 비율로 캔버스 설정
			canvas.width = Math.min(videoWidth, videoHeight * 0.75); // 3:4 비율에서 가로는 세로*0.75
			canvas.height = Math.min(videoHeight, videoWidth * 1.33); // 3:4 비율에서 세로는 가로*1.33

			// 캔버스 초기화
			context.clearRect(0, 0, canvas.width, canvas.height);

			// 비디오의 중앙에서 캡처할 영역 계산
			const sourceX = (videoWidth - canvas.width) / 2;
			const sourceY = (videoHeight - canvas.height) / 2;

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

			// 캔버스의 이미지 데이터를 base64 형식으로 추출
			const imageData = canvas.toDataURL('image/jpeg', 0.9); // 높은 품질로 저장
			setCapturedImage(imageData);

			return imageData;
		}
		return null;
	};

	// 사진 전송 함수
	const sendPhotoToBackend = async () => {
		const imageData = capturePhoto();

		if (!imageData) return null;

		try {
			// 이미지 데이터를 Blob으로 변환
			const response = await fetch(imageData);
			const blob = await response.blob();

			// FormData 생성 및 이미지 추가
			const formData = new FormData();
			formData.append('image', blob, 'capture.jpg');

			// 백엔드로 전송
			const serverResponse = await fetch('http://your-backend-url/api/upload', {
				method: 'POST',
				body: formData,
			});

			if (!serverResponse.ok) {
				throw new Error('서버 응답 에러');
			}

			return await serverResponse.json();
		} catch (error) {
			console.error('사진 전송 에러:', error);
			return null;
		}
	};

	// MediaPipe Pose 모델 초기화
	const initPoseDetection = async () => {
		try {
			// 이미 감지기가 생성되어 있으면 재사용
			if (poseDetector) {
				setDetectionActive(true);
				return;
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

			// 설정 (성능과 정확도 밸런스)
			await detector.setOptions({
				modelComplexity: 1, // 0: 라이트, 1: 풀
				smoothLandmarks: true,
				minDetectionConfidence: 0.5,
				minTrackingConfidence: 0.5,
			});

			// 결과 처리 콜백
			detector.onResults(results => {
				if (results.poseLandmarks) {
					// 감지된 키포인트가 프레임 내에 있는지 확인
					const insidePercentage = checkLandmarksInFrame(results.poseLandmarks);
					setDetectionPercentage(insidePercentage);
					setPersonDetected(insidePercentage >= 60); // 60% 이상의 키포인트가 프레임 내에 있으면 검출 성공
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
				// 현재 비디오 프레임을 감지기에 전달
				await detector.send({ image: videoRef.current });

				// 다음 프레임 처리
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

	// 키포인트가 상체 이미지 가이드에 맞는지 확인
	const checkLandmarksInFrame = landmarks => {
		if (!landmarks || landmarks.length === 0) return 0;

		// 상체 이미지 가이드 영역 (10%-90% 영역으로 설정했으므로 넓게 잡음)
		const imageRect = {
			left: 0.1, // 왼쪽 10% 지점
			top: 0.1, // 위쪽 10% 지점
			right: 0.9, // 오른쪽 90% 지점
			bottom: 0.9, // 아래쪽 90% 지점
		};

		// 상체에 해당하는 키포인트만 선택
		const upperBodyLandmarks = [
			0, // 코
			1,
			2,
			3,
			4, // 눈, 귀
			5,
			6,
			7,
			8,
			9,
			10, // 입, 얼굴
			11,
			12, // 어깨
			13,
			14, // 팔꿈치
			15,
			16, // 손목
		];

		// 프레임 내에 있는 키포인트 카운트
		let pointsInFrame = 0;
		let totalPoints = 0;

		for (const index of upperBodyLandmarks) {
			if (landmarks[index] && landmarks[index].visibility > 0.5) {
				totalPoints++;

				const { x, y } = landmarks[index];

				// 키포인트가 이미지 가이드 영역 내에 있는지 확인
				// 상체 이미지는 중앙에 있으므로 별도 위치 조정이 필요할 수 있음
				// 기본 영역은 넓게 설정하고 특정 키포인트는 더 자세한 위치 검증 가능
				if (checkPointInUpperbodyArea(index, x, y)) {
					pointsInFrame++;
				}
			}
		}

		// 프레임 내 키포인트 비율 계산 (백분율)
		return totalPoints > 0 ? Math.round((pointsInFrame / totalPoints) * 100) : 0;
	};

	// 특정 키포인트가 상체 이미지의 적절한 위치에 있는지 체크
	const checkPointInUpperbodyArea = (index, x, y) => {
		// 기본 영역 (전체 가이드 이미지 영역)
		const baseRect = {
			left: 0.1,
			top: 0.1,
			right: 0.9,
			bottom: 0.9,
		};

		// 상체 이미지에 맞춘 세부 영역 정의
		// 여기서 키포인트별로 더 세밀하게 위치 조정 가능
		const areaMap = {
			// 얼굴 영역 (상단 중앙)
			0: { left: 0.35, top: 0.1, right: 0.65, bottom: 0.3 }, // 코
			1: { left: 0.35, top: 0.1, right: 0.65, bottom: 0.25 }, // 왼쪽 눈
			2: { left: 0.35, top: 0.1, right: 0.65, bottom: 0.25 }, // 오른쪽 눈

			// 어깨 영역 (중단부)
			11: { left: 0.2, top: 0.3, right: 0.45, bottom: 0.5 }, // 왼쪽 어깨
			12: { left: 0.55, top: 0.3, right: 0.8, bottom: 0.5 }, // 오른쪽 어깨

			// 팔 영역
			13: { left: 0.05, top: 0.4, right: 0.4, bottom: 0.7 }, // 왼쪽 팔꿈치
			14: { left: 0.6, top: 0.4, right: 0.95, bottom: 0.7 }, // 오른쪽 팔꿈치
			15: { left: 0.05, top: 0.5, right: 0.4, bottom: 0.9 }, // 왼쪽 손목
			16: { left: 0.6, top: 0.5, right: 0.95, bottom: 0.9 }, // 오른쪽 손목
		};

		// 해당 키포인트의 특정 영역이 정의되어 있는지 확인
		if (index in areaMap) {
			const area = areaMap[index];
			return x >= area.left && x <= area.right && y >= area.top && y <= area.bottom;
		}

		// 특정 영역이 정의되지 않은 키포인트는 기본 영역으로 체크
		return x >= baseRect.left && x <= baseRect.right && y >= baseRect.top && y <= baseRect.bottom;
	};

	// 컴포넌트 마운트 시 카메라 시작
	useEffect(() => {
		startCamera();

		// 컴포넌트 언마운트 시 정리
		return () => {
			stopCamera();
			setDetectionActive(false);
		};
	}, []); // 빈 의존성 배열로 최초 한 번만 실행

	// 카메라가 켜지면 자동으로 감지 시작
	useEffect(() => {
		if (isCameraOn) {
			initPoseDetection();
		}
	}, [isCameraOn]);

	// pose detector가 설정되면 감지 시작
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
		initPoseDetection,
	};
};

export default useCamera;
