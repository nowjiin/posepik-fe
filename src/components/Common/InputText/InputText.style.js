import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Input = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const InputText = styled.input`
	width: 356px;
	padding: 14.65px 12.35px;
	box-sizing: border-box;
	border-radius: 7px;

	font-family: 'Pretendard';
	${({ theme }) => theme.FONT.BOLD(14, 124)}
	color: ${theme.COLOR.SubBlue1};
	border: ${({ $isInvalid }) => ($isInvalid ? `1px solid ${theme.COLOR.Red}` : `1px solid ${theme.COLOR.Gray20}}`)};
	outline: none;
	background: ${theme.COLOR.WHITE};

	&:focus {
		border-bottom: ${({ $isInvalid }) =>
			$isInvalid ? `1px solid ${theme.COLOR.Red}` : `1px solid ${theme.COLOR.PrimaryBlue1}}`};
	}
`;

export const Warn = styled.div`
	color: ${theme.COLOR.Red};
	${({ theme }) => theme.FONT.REGULAR(8, 124)}
	padding-left: 10px;
`;
