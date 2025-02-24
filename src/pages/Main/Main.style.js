import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Example = styled.div`
	${({ theme }) => theme.FONT.SEMIBOLD(24, 108)}
	color: ${theme.COLOR.BLACK};
`;
