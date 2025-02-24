import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{ find: '@', replacement: '/src' },
			{ find: '@assets', replacement: '/src/assets' },
			{ find: '@components', replacement: '/src/components' },
			{ find: '@hooks', replacement: '/src/hooks' },
			{ find: '@pages', replacement: '/src/pages' },
			{ find: '@styles', replacement: '/src/styles' },
		],
	},
});
