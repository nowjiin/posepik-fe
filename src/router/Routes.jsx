import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '@hooks/common/ScrollToTop';
import Main from '@pages/Main/Main';
import Splash from '@pages/Splash/Splash';
import Map from '@pages/Map/Map';
import MapDetail from '@pages/MapDetail/MapDetail';
import PictureDetail from '@pages/PictureDetail/PictureDetail';
import Camera from '@pages/Camera/Camera';
import CameraResult from '@pages/CameraResult/CameraResult';
import Error from '@pages/Error/Error';

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Splash />} />
				<Route path="/main" element={<Main />} />
				<Route path="/map" element={<Map />} />
				<Route path="/map-detail" element={<MapDetail />} />
				<Route path="/picture-detail/:id" element={<PictureDetail />} />
				<Route path="/camera" element={<Camera />} />
				<Route path="/camera-result/:id" element={<CameraResult />} />
				<Route path="/*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
