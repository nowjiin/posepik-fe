import styled from 'styled-components';
import { theme } from '@styles/theme';

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 80px;
	background: linear-gradient(92deg, ${theme.COLOR.SubPurple2} 4.16%, ${theme.COLOR.SubBlue2} 109.31%);
	border-radius: 15px 15px 0 0;
	gap: 11px;
	cursor: pointer;

	${({ theme }) => theme.FONT.BOLD(18, 26)}
	color: ${theme.COLOR.WHITE};
`;

export const CameraIcon = styled.img`
	width: 25px;
	height: 25px;
`;
