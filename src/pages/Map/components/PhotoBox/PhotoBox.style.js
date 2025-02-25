import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Container = styled.div`
	width: 155px;
	display: flex;
	flex-direction: column;
	cursor: pointer;
`;

export const Img = styled.img`
	width: 100%;
	height: 105px;
	object-fit: cover;
	border-radius: 10px 10px 0 0;
`;

export const TextContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 2px;
	padding: 4.5px 8.5px 7.5px;
	background-color: ${theme.COLOR.SubBlue3};
	border-radius: 0 0 10px 10px;
`;

export const Title = styled.div`
	width: 100%;
	${({ theme }) => theme.FONT.BOLD(11, 145)};
	color: ${theme.COLOR.BLACK};
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

export const InstaBox = styled.div`
	width: fit-content;
	padding: 1px 3.5px;
	${({ theme }) => theme.FONT.MEDIUM(8, 145)};
	color: ${theme.COLOR.SubBlue3};
	background-color: ${theme.COLOR.SubBlue2};
	border-radius: 2px;
`;
