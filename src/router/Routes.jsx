import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from '@hooks/common/ScrollToTop';
import Main from '@pages/Main/Main';
import Camera from '@pages/Camera/Camera';

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Navigate to="/main" replace />} />
				<Route path="/main" element={<Main />} />
				<Route path="/camera" element={<Camera />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
