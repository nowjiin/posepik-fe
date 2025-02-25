import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Container = styled.div`
	width: 100%;
	box-sizing: border-box;
	padding: 14px 11px;
	display: flex;
	align-items: center;
	gap: 4px;
	border: 0.6px solid ${theme.COLOR.Gray20};
	border-radius: 5px;
`;

export const LocationImg = styled.img`
	width: 24px;
	height: 24px;
`;

export const TextContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	${({ theme }) => theme.FONT.MEDIUM(15, 145)}
`;

export const Country = styled.div`
	color: ${theme.COLOR.Gray500};
`;

export const Area = styled.div`
	color: ${theme.COLOR.PrimaryBlue1};
`;

export const RightImg = styled.img`
	width: 12px;
	height: 24px;
`;
