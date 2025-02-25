import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Container = styled.div`
	width: 100%;
	height: 21px;
	padding: 0 10px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 2px;
	background-color: ${theme.COLOR.SubBlue3};
`;

export const Text = styled.div`
	width: 100%;
	text-align: center;
	${({ theme }) => theme.FONT.MEDIUM(8, 145)};
	color: ${theme.COLOR.PrimaryBlue1};
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;
