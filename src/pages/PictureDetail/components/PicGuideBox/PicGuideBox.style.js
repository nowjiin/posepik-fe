import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Container = styled.div`
	max-width: 100%;
	padding: 3px 8px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0.27px solid ${theme.COLOR.Gray25};
	border-radius: 2.733px;
	background-color: rgba(230, 229, 229, 0.63);
`;

export const Text = styled.div`
	width: 100%;
	text-align: center;
	${({ theme }) => theme.FONT.REGULAR(12, 145)};
	color: ${theme.COLOR.Gray50};
	white-space: wrap;
`;
