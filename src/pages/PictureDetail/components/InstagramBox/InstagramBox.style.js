import styled from 'styled-components';
import { theme } from '@styles/theme';

export const SpaceContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	cursor: pointer;
`;

export const InstagramImg = styled.img`
	width: 23px;
	height: 23px;
`;

export const Container = styled.div`
	padding: 2px 6.2px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 3px;
	background-color: rgba(222, 229, 255, 0.53);

	${({ theme }) => theme.FONT.MEDIUM(14, 145)};
	color: ${theme.COLOR.PrimaryBlue1};
`;
