import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '@hooks/common/ScrollToTop';
import Main from '@pages/Main/Main';
import Splash from '@pages/Splash/Splash';
import Map from '@pages/Map/Map';
import MapDetail from '@pages/MapDetail/MapDetail';
import PictureDetail from '@pages/PictureDetail/PictureDetail';
import Camera from '@pages/Camera/Camera';
import Camera1 from '@pages/Camera/Camera1';
import Camera2 from '@pages/Camera/Camera2';
import Camera3 from '@pages/Camera/Camera3';
import Camera4 from '@pages/Camera/Camera4';
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
				<Route path="/camera1" element={<Camera1 />} />
				<Route path="/camera2" element={<Camera2 />} />
				<Route path="/camera3" element={<Camera3 />} />
				<Route path="/camera4" element={<Camera4 />} />
				<Route path="/camera-result/:id" element={<CameraResult />} />
				<Route path="/*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
