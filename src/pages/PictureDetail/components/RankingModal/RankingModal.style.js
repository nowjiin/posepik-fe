import styled from 'styled-components';
import { theme } from '@styles/theme';

export const ModalWrap = styled.div`
	width: calc(100% - 92px);
	aspect-ratio: 3 / 4;
	height: auto;
	border-radius: 24px;
	z-index: 150;
	background-color: ${theme.COLOR.PrimaryBlue1};
	border: 2px solid ${theme.COLOR.PrimaryBlue1};
	border-left: 3px solid ${theme.COLOR.PrimaryBlue1};
	border-right: 3px solid ${theme.COLOR.PrimaryBlue1};
	position: relative;

	@media (hover: hover) and (pointer: fine) {
		width: calc(440px - 92px);
	}
`;

export const ModalSpace = styled.div`
	width: 100vw;
	height: 100dvh;
	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	top: 0;
	left: 0;
`;

export const ModalBackground = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	top: 0;
	left: 0;
	z-index: 120;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Picture = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 24px;
	margin-top: 2px;
`;

export const CloseContainer = styled.div`
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	padding: 17px 19px;
	box-sizing: border-box;
	display: flex;
	justify-content: flex-end;
`;

export const CloseImg = styled.img`
	width: 14px;
	height: 14px;
	cursor: pointer;
`;
