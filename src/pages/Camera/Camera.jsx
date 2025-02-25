import { useEffect } from 'react';
import CameraComponent from '@components/Camera/CameraComponent';
export default function Camera() {
	// OpenCV.js 로딩 확인
	useEffect(() => {
		// 이미 로드되어 있는지 확인
		if (typeof window.cv !== 'undefined') {
			console.log('OpenCV.js가 이미 로드되어 있습니다.');
			if (typeof window.onOpenCvReady === 'function') {
				window.onOpenCvReady();
			}
		} else {
			console.log('OpenCV.js 로딩을 대기합니다...');
		}
	}, []);
	return <CameraComponent />;
}
