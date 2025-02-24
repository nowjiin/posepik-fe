import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App.jsx';
import * as S from '@/styles/common.style';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<S.Page>
			<App />
		</S.Page>
	</StrictMode>,
);
