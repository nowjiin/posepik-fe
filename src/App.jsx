import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from '@hooks/common/ScrollToTop';
import '@/App.css';
import theme from '@styles/theme';

import Main from '@pages/Main/Main';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Navigate to="/main" replace />} />
					<Route path="/main" element={<Main />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
