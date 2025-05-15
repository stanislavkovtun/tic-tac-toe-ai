import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	base: '/tic-tac-toe-ai/',
	plugins: [react()],
	test: {
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.js'],
		globals: true,
	},
});
