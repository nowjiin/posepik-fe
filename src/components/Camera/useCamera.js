import { useState, useEffect, useRef } from 'react';
import { loadOpenCV, isOpenCVReady } from './OpenCVLoader';

// 카메라 기능 관리
// 카메라 시작/종료, 촬영, 실루엣 비교
const useCamera = () => {
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [isCameraOn, setIsCameraOn] = useState(false);
	const [cameraError, setCameraError] = useState(null);
	const [capturedImage, setCapturedImage] = useState(null);
	const [facingMode, setFacingMode] = useState('user'); // 'user' (전면) 또는 'environment' (후면)
	const [isFlipped, setIsFlipped] = useState(false); // 좌우 반전 상태
	const [silhouetteImage, setSilhouetteImage] = useState('/images/tree_silhouette.png'); // 실루엣 이미지 경로
	const [positionStatus, setPositionStatus] = useState('none'); // 'none', 'too-close', 'too-far', 'perfect', 'not-centered'

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

	// 자세 확인 (실루엣과 사용자 비교)
	const checkPosition = () => {
		if (!videoRef.current || !isCameraOn) return;

		try {
			// OpenCV가 준비되지 않았으면 중단
			if (!isOpenCVReady()) {
				console.warn('OpenCV.js가 아직 준비되지 않았습니다.');
				return;
			}

			// 1. 현재 비디오 프레임 캡처하여 OpenCV 매트로 변환
			const video = videoRef.current;
			const tempCanvas = document.createElement('canvas');
			tempCanvas.width = video.videoWidth;
			tempCanvas.height = video.videoHeight;
			const ctx = tempCanvas.getContext('2d');
			ctx.drawImage(video, 0, 0);

			// 2. 비디오 프레임을 OpenCV 매트로 변환
			const src = window.cv.imread(tempCanvas);
			const dst = new window.cv.Mat();

			// 3. 전처리 - 그레이스케일 변환 및 블러 적용
			window.cv.cvtColor(src, dst, window.cv.COLOR_RGBA2GRAY);
			window.cv.GaussianBlur(dst, dst, new window.cv.Size(5, 5), 0, 0, window.cv.BORDER_DEFAULT);

			// 4. 경계 감지 (Canny Edge Detection)
			const edges = new window.cv.Mat();
			window.cv.Canny(dst, edges, 50, 150);

			// 5. 윤곽선 검출
			const contours = new window.cv.MatVector();
			const hierarchy = new window.cv.Mat();
			window.cv.findContours(edges, contours, hierarchy, window.cv.RETR_EXTERNAL, window.cv.CHAIN_APPROX_SIMPLE);

			// 6. 가장 큰 윤곽선 찾기 (사람으로 가정)
			let maxArea = 0;
			let maxContourIndex = -1;

			for (let i = 0; i < contours.size(); i++) {
				const contour = contours.get(i);
				const area = window.cv.contourArea(contour);

				if (area > maxArea) {
					maxArea = area;
					maxContourIndex = i;
				}
			}

			// 7. 감지된 가장 큰 윤곽선이 있는지 확인
			if (maxContourIndex === -1) {
				setPositionStatus('none'); // 아무것도 감지되지 않음
			} else {
				// 8. 감지된 윤곽선의 바운딩 박스 구하기
				const maxContour = contours.get(maxContourIndex);
				const boundingRect = window.cv.boundingRect(maxContour);

				// 9. 비디오 프레임 대비 바운딩 박스의 크기 비율 계산
				const frameArea = src.rows * src.cols;
				const boundingBoxArea = boundingRect.width * boundingRect.height;
				const areaRatio = boundingBoxArea / frameArea;

				// 10. 바운딩 박스 중심 위치 계산
				const centerX = boundingRect.x + boundingRect.width / 2;
				const centerY = boundingRect.y + boundingRect.height / 2;

				// 11. 화면 중심과의 거리 계산
				const frameCenter = { x: src.cols / 2, y: src.rows / 2 };
				const distanceFromCenter = Math.sqrt(
					Math.pow(centerX - frameCenter.x, 2) + Math.pow(centerY - frameCenter.y, 2),
				);

				// 12. 중심 거리 비율 계산 (화면 대각선 길이 대비)
				const diagonalLength = Math.sqrt(Math.pow(src.cols, 2) + Math.pow(src.rows, 2));
				const centerDistanceRatio = distanceFromCenter / diagonalLength;

				// 13. 크기와 위치에 따라 상태 업데이트
				// 일반적으로 적절한 크기는 화면의 30~60% 정도
				if (areaRatio < 0.25) {
					setPositionStatus('too-far'); // 너무 멀리 있음
				} else if (areaRatio > 0.7) {
					setPositionStatus('too-close'); // 너무 가까이 있음
				} else if (centerDistanceRatio > 0.2) {
					setPositionStatus('not-centered'); // 중앙에 위치하지 않음
				} else {
					setPositionStatus('perfect'); // 적절한 위치
				}
			}

			// 14. 사용한 메모리 해제
			src.delete();
			dst.delete();
			edges.delete();
			contours.delete();
			hierarchy.delete();
		} catch (error) {
			console.error('OpenCV 처리 중 오류 발생:', error);
		}
	};

	// 컴포넌트 마운트 시 카메라 시작 및 OpenCV 로드
	useEffect(() => {
		// 최초 한 번만 실행되도록 빈 의존성 배열 사용
		const startCameraWithOpenCV = () => {
			console.log('OpenCV.js를 통한 카메라 시작 시도');
			startCamera();
		};

		// OpenCV.js 로드 확인 및 카메라 시작
		loadOpenCV(startCameraWithOpenCV);

		// 컴포넌트 언마운트 시 정리
		return () => {
			console.log('카메라 컴포넌트 정리');
			stopCamera();
		};
	}, []); // 빈 의존성 배열로 최초 한 번만 실행

	// 자세 분석 간격 설정을 위한 별도의 useEffect
	useEffect(() => {
		let positionCheckInterval;

		// OpenCV가 준비되고 카메라가 켜져 있을 때만 자세 분석 간격 시작
		if (isCameraOn && isOpenCVReady()) {
			console.log('자세 분석 간격 설정');
			positionCheckInterval = setInterval(() => {
				if (isOpenCVReady()) {
					checkPosition();
				} else {
					console.warn('OpenCV.js가 아직 준비되지 않았습니다.');
				}
			}, 1000);
		} // 간격 정리
		return () => {
			if (positionCheckInterval) {
				clearInterval(positionCheckInterval);
			}
		};
	}, [isCameraOn]); // isCameraOn이 변경될 때만 실행

	return {
		videoRef,
		canvasRef,
		isCameraOn,
		cameraError,
		capturedImage,
		facingMode,
		isFlipped,
		silhouetteImage,
		positionStatus,
		startCamera,
		stopCamera,
		capturePhoto,
		sendPhotoToBackend,
		switchCamera,
		toggleFlip,
	};
};

export default useCamera;
