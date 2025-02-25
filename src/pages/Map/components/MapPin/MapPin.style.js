import styled from 'styled-components';

export const Container = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 42px;
	height: auto;
	cursor: pointer;
`;

export const PinImg = styled.img`
	width: 42px;
	height: auto;
`;

export const Img = styled.img`
	position: absolute;
	top: 6px;
	left: 50%;
	transform: translateX(-50%);
	width: 28.82px;
	height: 28.82px;
	aspect-ratio: 1 / 1;
	border-radius: 50%;
	object-fit: cover;
`;
