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
	Gray25: '#D6D6D6',
	Gray30: '#A8A8A8',
	Gray40: '#656565',
	Gray50: '#4D4D4D',
	Gray60: '#5B5B5B',
	Gray70: '#3F3F3F',
	Red: '#FF3F3F',
} as const;

const FONT = {
	BOLD: (size: number, lineHeight?: number) => `
  font-weight: 700;
  font-size: ${size}px;
  line-height: ${lineHeight}%;
`,
	SEMIBOLD: (size: number, lineHeight?: number) => `
  font-weight: 600;
  font-size: ${size}px;
  line-height: ${lineHeight}%;
`,
	REGULAR: (size: number, lineHeight?: number) => `
  font-weight: 400;
  font-size: ${size}px;
  line-height: ${lineHeight}%;
`,
} as const;

export const theme = {
	COLOR,
	FONT,
} as const;

export default theme;

// styled-components의 DefaultTheme 정의
import 'styled-components';
declare module 'styled-components' {
	export interface DefaultTheme {
		COLOR: typeof COLOR;
		FONT: typeof FONT;
	}
}
