import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Main = styled.div`
	${({ theme }) => theme.FONT.SEMIBOLD(18, 108)}
	color: ${theme.COLOR.BLACK};
	padding: 40px;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
`;
