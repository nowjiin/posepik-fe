import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Container = styled.div`
	width: 100%;
	max-height: 63px;
	padding: 10px 11px;
	box-sizing: border-box;
	display: flex;
	gap: 6px;
	border-radius: 2.733px;
	background-color: ${theme.COLOR.SubBlue3};
`;

export const PhotoImg = styled.img`
	width: 22px;
	height: 22px;
`;

export const Text = styled.div`
	width: 100%;
	${({ theme }) => theme.FONT.MEDIUM(10, 145)};
	color: ${theme.COLOR.PrimaryBlue1};
	white-space: wrap;
`;
