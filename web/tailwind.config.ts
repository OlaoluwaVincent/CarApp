import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'dark-900': '#0A196F',
				'dark-800': '#102587',
				'dark-700': '#1A37A7',
				'dark-600': '#264BC8',
				'dark-500': '#3563E9',
				'dark-400': '#658DF1',
				'dark-300': '#85A8F8',
				'dark-200': '#AEC8FC',
				'dark-100': '#D6E4FD',
				'success-900': '#3B6506',
				'success-800': '#4C7A0B',
				'success-700': '#659711',
				'success-600': '#7FB519',
				'success-500': '#9CD323',
				'success-400': '#BCE455',
				'success-300': '#D3F178',
				'success-200': '#E8FAA6',
				'success-100': '#F5FCD2',
				'error-900': '#7A0619',
				'error-800': '#930B16',
				'error-700': '#B71112',
				'error-600': '#DB2719',
				'error-500': '#FF4423',
				'error-400': '#FF7F59',
				'error-300': '#FFA37A',
				'error-200': '#FFC8A6',
				'error-100': '#FFE7D3',
				'warning-900': '#7A4D0B',
				'warning-800': '#936312',
				'warning-700': '#B7821D',
				'warning-600': '#DBA32A',
				'warning-500': '#FFC73A',
				'warning-400': '#FFD96B',
				'warning-300': '#FFE488',
				'warning-200': '#FFEFB0',
				'warning-100': '#FFF8D7',
				'info-900': '#102E7A',
				'info-800': '#1A4393',
				'info-700': '#2A60B7',
				'info-600': '#3D81DB',
				'info-500': '#54A6FF',
				'info-400': '#7EC2FF',
				'info-300': '#98D3FF',
				'info-200': '#BAE5FF',
				'info-100': '#DCF3FF',
				'black-900': '#040815',
				'black-800': '#080C19',
				'black-700': '#0D121F',
				'black-600': '#131825',
				'black-500': '#1A202C',
				'black-400': '#596780',
				'black-300': '#90A3BF',
				'black-200': '#C3D4E9',
				'black-100': '#E0E9F4',
			},
			fontSize: {
				xs: [
					'12px',
					{
						lineHeight: 'normal',
						letterSpacing: '-0.12px',
					},
				],
				sm: [
					'14px',
					{
						lineHeight: '24px',
						letterSpacing: '-0.28px',
					},
				],

				base: [
					'16px',
					{
						lineHeight: '24px',
						letterSpacing: '-0.32px',
					},
				],
				lg: [
					'18px',
					{
						lineHeight: '27px',
						letterSpacing: '-0.36px',
					},
				],
				xl: [
					'20px',
					{
						lineHeight: '30px',
						letterSpacing: '-0.4px',
					},
				],
				'2xl': [
					'24px',
					{
						lineHeight: '36px',
						letterSpacing: '-0.48px',
					},
				],
				'3xl': [
					'32px',
					{
						lineHeight: '48px',
						letterSpacing: '-0.64px',
					},
				],
				'4xl': [
					'36px',
					{
						lineHeight: '54px',
						letterSpacing: '-1.08px',
					},
				],
				'5xl': [
					'40px',
					{
						lineHeight: '60px',
						letterSpacing: '-1.2px',
					},
				],
				'6xl': [
					'72px',
					{
						lineHeight: '108px',
						letterSpacing: '-2.88px',
					},
				],
			},
			screens: {
				'base': '420px',
			},
		},
	},
	plugins: [],
};
export default config;
