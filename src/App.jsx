import { ThemeProvider } from 'styled-components';
import '@/App.css';
import theme from '@styles/theme';
import Routes from './router/Routes';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Routes />
		</ThemeProvider>
	);
}

export default App;
