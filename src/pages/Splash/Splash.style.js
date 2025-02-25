import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	height: 100dvh;
	padding: 145px 50px 20px;
	background: linear-gradient(169deg, ${theme.COLOR.SubBlue2} 0%, ${theme.COLOR.Gray10} 98.91%);
`;

export const LogoContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
`;

export const TLogo = styled.img`
	width: 284.8px;
	height: auto;
`;

export const CLogo = styled.img`
	width: 274px;
	height: auto;
`;
