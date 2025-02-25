import styled from 'styled-components';
import { theme } from '@styles/theme';

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 341px;
	height: 55px;
	background-color: ${props => (props.$isActive ? `${theme.COLOR.SubBlue1}` : `${theme.COLOR.SubBlue2}`)};
	border-radius: 7px;
	cursor: pointer;

	${({ theme }) => theme.FONT.BOLD(18, 26)}
	color: ${theme.COLOR.WHITE};
`;
