import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Space = styled.div`
	min-height: 100dvh;
	background-color: ${theme.COLOR.Gray10};
`;

export const Container = styled.div`
	height: calc(100dvh - 54px);
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const MapContainer = styled.div`
	height: 100%;
`;

export const BottomContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px 0 35px;
`;

export const Title = styled.div`
	padding: 0 28px;
	${({ theme }) => theme.FONT.BOLD(20, 145)}
	color: ${theme.COLOR.SubPurple1};
`;

export const PhotoContainer = styled.div`
	display: flex;
	padding: 0 16px;
	gap: 16px;
	overflow-x: auto;
	white-space: nowrap;

	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`;
