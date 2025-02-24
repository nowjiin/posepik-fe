const COLOR = {
	WHITE: '#FFFFFF',
	BLACK: '#000000',
	PrimaryBlue1: '#3C56BD',
	PrimaryBlue2: '#3722F6',
	SubBlue1: '#6175C4',
	SubBlue2: '#B6C3FA',
	SubBlue3: '#DEE5FF',
	SubBlue4: '#CDD7FF',
	SubPurple1: '#714CFE',
	SubPurple2: '#916EFF',
	SubPurple3: '#B39AFD',
	Gray10: '#F8F8F8',
	Gray20: '#D1D1D1',
	Gray30: '#A8A8A8',
	Gray40: '#656565',
	Gray50: '#4D4D4D',
	Gray60: '#5B5B5B',
	Gray70: '#3F3F3F',
	Red: '#FF3F3F',
};

const FONT = {
	BOLD: (size, lineHeight) => `
    font-weight: 700;
    font-size: ${size}px;
    line-height: ${lineHeight}%;
  `,
	SEMIBOLD: (size, lineHeight) => `
    font-weight: 600;
    font-size: ${size}px;
    line-height: ${lineHeight}%;
  `,
	REGULAR: (size, lineHeight) => `
    font-weight: 400;
    font-size: ${size}px;
    line-height: ${lineHeight}%;
  `,
};

export const theme = {
	COLOR,
	FONT,
};

export default theme;
