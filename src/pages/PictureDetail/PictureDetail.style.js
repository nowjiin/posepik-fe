import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Space = styled.div`
	min-height: 100dvh;
	background-color: ${theme.COLOR.Gray10};
`;

export const Container = styled.div`
	min-height: calc(100dvh - 54px + 80px);
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

export const BodyContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 35px;
	padding: 0 39px;
`;

export const TopContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 13px;
`;

export const InstaImg = styled.img`
	width: 179px;
	aspect-ratio: 3 / 4;
	height: auto;
	object-fit: cover;
	border-radius: 5px;
`;

export const TextContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const TitleContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	${({ theme }) => theme.FONT.BOLD(18, 145)};
	color: ${theme.COLOR.PrimaryBlue1};
`;

export const RefreshImg = styled.img`
	width: 16px;
	height: 16px;
	cursor: pointer;
`;

export const RankingContainer = styled.div`
	width: calc(100%);
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	align-items: flex-end;
	column-gap: 24px;
	margin-top: 25px;
`;

export const RankingBarContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	gap: 1px;
	align-items: center;
	cursor: pointer;

	${({ theme }) => theme.FONT.MEDIUM(12, 145)};
	color: ${theme.COLOR.BLACK};
`;

export const RankingBar1 = styled.div`
	width: 100%;
	box-sizing: border-box;
	height: 43px;
	border-radius: 3px;
	background-color: ${theme.COLOR.SubBlue3};

	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 2px;

	${({ theme }) => theme.FONT.MEDIUM(12, 145)};
	color: ${theme.COLOR.SubBlue2};
`;

export const RankingBar2 = styled.div`
	width: 100%;
	height: 107px;
	border-radius: 3px;
	background-color: ${theme.COLOR.SubBlue2};

	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 2px;

	${({ theme }) => theme.FONT.MEDIUM(12, 145)};
	color: ${theme.COLOR.WHITE};
`;

export const RankingBar3 = styled.div`
	width: 100%;
	height: 149px;
	border-radius: 3px;
	background-color: ${theme.COLOR.SubBlue1};

	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 2px;

	${({ theme }) => theme.FONT.MEDIUM(12, 145)};
	color: ${theme.COLOR.WHITE};
`;

export const RankingBar4 = styled.div`
	width: 100%;
	height: 68px;
	border-radius: 3px;
	background-color: ${theme.COLOR.SubBlue3};

	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 2px;

	${({ theme }) => theme.FONT.MEDIUM(12, 145)};
	color: ${theme.COLOR.SubBlue2};
`;

export const RankingBar5 = styled.div`
	width: 100%;
	min-height: 17px;
	border-radius: 3px;
	background-color: ${theme.COLOR.SubBlue3};

	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 2px;

	${({ theme }) => theme.FONT.MEDIUM(12, 145)};
	color: ${theme.COLOR.SubBlue2};
`;

export const MedalImg = styled.img`
	width: 70%;
	aspect-ratio: 1 / 1;
	height: auto;
`;

export const ButtonContainer = styled.div`
	width: 100%;
	position: fixed;
	left: transform(50%);
	bottom: 0;
	z-index: 200;

	@media (hover: hover) and (pointer: fine) {
		width: 440px;
	}
`;
