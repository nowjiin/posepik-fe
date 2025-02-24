import { useState, useEffect, useRef } from 'react';

const useCamera = () => {
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [isCameraOn, setIsCameraOn] = useState(false);
	const [cameraError, setCameraError] = useState(null);
	const [capturedImage, setCapturedImage] = useState(null);
	const [facingMode, setFacingMode] = useState('user'); // 'user' (전면) 또는 'environment' (후면)
	const [isFlipped, setIsFlipped] = useState(false); // 좌우 반전 상태

	// 카메라 시작
	const startCamera = async () => {
		try {
			// 4:3 비율로 설정 (세로가 긴 형태이므로 3:4로 설정)
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					aspectRatio: 3 / 4, // 세로가 더 길게 3:4 비율 설정
					width: { ideal: 960 }, // 해상도 설정
					height: { ideal: 1280 },
					facingMode: facingMode, // 현재 설정된 카메라 방향 사용
				},
			});

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

	// 좌우 반전 토글
	const toggleFlip = () => {
		setIsFlipped(prev => !prev);
		// 비디오 요소의 스타일은 직접 변경하지 않고,
		// StyledVideo 컴포넌트에서 isFlipped 상태를 이용해 스타일 적용
	};

	// 사진 촬영 (반전 상태 고려)
	const capturePhoto = () => {
		if (videoRef.current && canvasRef.current && isCameraOn) {
			const video = videoRef.current;
			const canvas = canvasRef.current;
			const context = canvas.getContext('2d');

			// 세로가 긴 3:4 비율 유지하면서 캔버스 설정
			const width = video.videoWidth;
			const height = video.videoHeight;

			// 세로가 긴 3:4 비율 적용
			canvas.width = height * (3 / 4);
			canvas.height = height;

			// 중앙 정렬하여 그리기 위한 위치 계산
			const sourceX = (width - height * (3 / 4)) / 2;
			const sourceY = 0;
			const sourceWidth = height * (3 / 4);
			const sourceHeight = height;

			// 캔버스 초기화
			context.clearRect(0, 0, canvas.width, canvas.height);

			// 좌우 반전 적용
			if (isFlipped) {
				context.save();
				context.scale(-1, 1);
				context.drawImage(
					video,
					sourceX,
					sourceY,
					sourceWidth,
					sourceHeight, // 원본 영역
					-canvas.width,
					0,
					canvas.width,
					canvas.height, // 타겟 영역 (좌우 반전을 위해 x 좌표를 음수로)
				);
				context.restore();
			} else {
				// 비디오 프레임을 캔버스에 그리기 (3:4 비율 유지)
				context.drawImage(
					video,
					sourceX,
					sourceY,
					sourceWidth,
					sourceHeight, // 원본 영역
					0,
					0,
					canvas.width,
					canvas.height, // 타겟 영역
				);
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

	// 컴포넌트 unmount 시 카메라 종료
	useEffect(() => {
		return () => {
			stopCamera();
		};
	}, []);

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
					aspectRatio: 3 / 4,
					width: { ideal: 960 },
					height: { ideal: 1280 },
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

	return {
		videoRef,
		canvasRef,
		isCameraOn,
		cameraError,
		capturedImage,
		facingMode,
		isFlipped,
		startCamera,
		stopCamera,
		capturePhoto,
		sendPhotoToBackend,
		switchCamera,
		toggleFlip,
	};
};

export default useCamera;
