import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Space = styled.div`
	min-height: 100dvh;
	background-color: ${theme.COLOR.Gray10};
`;

export const Container = styled.div`
	min-height: calc(100dvh - 54px);
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

export const BodyContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 35px;
	padding: 0 39px;
	margin-bottom: 50px;
`;

export const ImageContainer = styled.div`
	padding: 20px 0;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	gap: 5px;
`;

export const InstaImg = styled.img`
	width: 50%;
	aspect-ratio: 3 / 4;
	height: auto;
	object-fit: cover;
	border-radius: 5px;
`;

export const TextContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const TitleContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	${({ theme }) => theme.FONT.BOLD(18, 145)};
	color: ${theme.COLOR.PrimaryBlue1};
`;

export const Text = styled.div`
	margin-top: -5px;
	${({ theme }) => theme.FONT.REGULAR(10, 145)};
	color: ${theme.COLOR.Gray40};
`;

export const InputContainer = styled.div`
	width: 100%;
	min-height: 70px;
	margin-top: 5px;
`;

export const ButtonSpaceContainer = styled.div`
	width: 100%;
	padding: 5px 57px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;

	${({ theme }) => theme.FONT.BOLD(12, 145)};
	color: ${theme.COLOR.PrimaryBlue1};
	cursor: pointer;
	text-align: center;
`;

export const Button = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 72px;
	height: 72px;
	border-radius: 50%;
	background-color: ${theme.COLOR.SubBlue3};
`;

export const ButtonImg = styled.img`
	width: 40px;
	height: 40px;
`;
