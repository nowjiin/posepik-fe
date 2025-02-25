/**
 * OpenCV.js 로더 모듈
 * OpenCV.js의 로딩 상태를 관리하고 로딩 완료 시 콜백을 실행
 */

// OpenCV.js 로드 상태
let isOpenCVLoaded = false;

// OpenCV.js 로드 완료 시 실행할 콜백들
const onLoadCallbacks = [];

/**
 * OpenCV 로드 완료 시 호출되는 함수
 * index.html 또는 페이지에서 직접 호출할 수 있도록 전역으로 정의
 */
window.onOpenCvReady = () => {
	console.log('OpenCV.js 로드 완료!');
	isOpenCVLoaded = true;

	// 등록된 모든 콜백 실행
	onLoadCallbacks.forEach(callback => {
		try {
			callback();
		} catch (e) {
			console.error('OpenCV 콜백 실행 중 오류:', e);
		}
	});
};

/**
 * OpenCV.js가 로드되면 콜백을 실행하는 함수
 *
 * @param {Function} callback - OpenCV 로드 완료 시 실행할 콜백 함수
 * @returns {boolean} - OpenCV가 이미 로드되어 있다면 true, 아니면 false
 */
export const loadOpenCV = callback => {
	// 콜백이 함수인지 확인
	if (typeof callback === 'function') {
		if (isOpenCVLoaded && window.cv) {
			// 이미 로드된 경우 즉시 콜백 실행
			setTimeout(() => callback(), 0);
			return true;
		} else {
			// 아직 로드 중인 경우 콜백 등록
			onLoadCallbacks.push(callback);
		}
	}

	return isOpenCVLoaded;
};

/**
 * OpenCV.js가 로드되었는지 확인하는 함수
 *
 * @returns {boolean} - OpenCV가 로드되었으면 true, 아니면 false
 */
export const isOpenCVReady = () => {
	return isOpenCVLoaded && typeof window.cv !== 'undefined';
};

// 페이지에 이미 로드된 OpenCV 확인
if (typeof window.cv !== 'undefined') {
	isOpenCVLoaded = true;
	console.log('기존에 로드된 OpenCV.js 감지됨');
}

export default {
	loadOpenCV,
	isOpenCVReady,
};
