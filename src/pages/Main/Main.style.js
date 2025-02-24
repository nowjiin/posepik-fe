import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Main = styled.div`
	${({ theme }) => theme.FONT.SEMIBOLD(24, 108)}
	color: ${theme.COLOR.BLACK};
`;
