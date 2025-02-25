import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Space = styled.div`
	min-height: 100dvh;
	background-color: ${theme.COLOR.Gray10};
`;

export const Container = styled.div`
	height: 100dvh;
	margin-top: -54px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Background = styled.img`
	width: 100%;
	height: auto;
`;

export const BottomContainer = styled.div`
	width: 100%;
	padding: 14px 39px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 21px;
`;

export const PhotoContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 50% 50%;
	row-gap: 16px;
	column-gap: 22px;
`;

export const PhotoBox = styled.div`
	width: calc(100% - 22px);
	display: flex;
	flex-direction: column;
	gap: 5px;
	cursor: pointer;
`;

export const Photo = styled.img`
	width: 100%;
	aspect-ratio: 1 / 1;
	height: auto;
	object-fit: cover;
	border-radius: 5px;
`;
