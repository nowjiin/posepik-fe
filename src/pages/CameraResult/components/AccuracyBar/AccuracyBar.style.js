import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Container = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 6px 8px;
	gap: 8px;
	background-color: ${theme.COLOR.SubBlue3};
`;

export const RankingImg = styled.img`
	width: 32px;
	height: 32px;
`;

export const Text = styled.div`
	${({ theme }) => theme.FONT.BOLD(24, 145)};
	color: ${theme.COLOR.PrimaryBlue1};
`;
