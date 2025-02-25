import styled from 'styled-components';
import { theme } from '@styles/theme';

export const ModalWrap = styled.div`
	width: calc(100% - 124px);
	box-sizing: border-box;
	padding: 21.5px 18.5px 18.5px;
	border-radius: 22px;
	z-index: 150;
	background-color: ${theme.COLOR.WHITE};

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;

	@media (hover: hover) and (pointer: fine) {
		width: calc(440px - 124px);
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

export const TextContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2px;

	${({ theme }) => theme.FONT.MEDIUM(18, 150)};
	color: ${theme.COLOR.Gray70};
`;

export const Content = styled.div`
	${({ theme }) => theme.FONT.REGULAR(12, 150)};
	color: ${theme.COLOR.Gray40};
`;

export const ButtonContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	padding: 18px 0;
	background-color: ${theme.COLOR.SubBlue1};
	border-radius: 7.5px;

	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	${({ theme }) => theme.FONT.BOLD(15, 100)};
	color: ${theme.COLOR.WHITE};
`;
