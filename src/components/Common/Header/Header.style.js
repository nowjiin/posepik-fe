import styled from 'styled-components';
// import { theme } from '@styles/theme';

export const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100vw;
	height: 54px;
	box-sizing: border-box;
	padding: 10px 25px;
	position: relative;
	z-index: 100;

	@media (hover: hover) and (pointer: fine) {
		width: 440px;
	}
`;

export const LogoImg = styled.img`
	width: 135px;
	height: auto;
	cursor: pointer;
`;

export const BackImg = styled.img`
	width: 34px;
	height: 34px;
	margin-left: -5px;
	cursor: pointer;
`;
