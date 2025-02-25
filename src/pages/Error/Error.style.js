import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Space = styled.div`
	height: 100dvh;
	background-color: ${theme.COLOR.Gray10};
`;

export const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	padding: 130px 0;
	gap: 18px;
`;

export const ErrorImg = styled.img`
	width: 177px;
	height: auto;
`;

export const Text = styled.div`
	${({ theme }) => theme.FONT.SEMIBOLD(18, 145)}
	color: ${theme.COLOR.BLACK};
`;

export const ButtonContainer = styled.div`
	margin-top: 17px;
	padding: 10px 17px;
	border-radius: 5px;
	background-color: ${theme.COLOR.PrimaryBlue1};
	cursor: pointer;
	${({ theme }) => theme.FONT.SEMIBOLD(12, 145)}
	color: ${theme.COLOR.Gray10};
`;
