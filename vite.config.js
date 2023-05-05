import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/hive-weather/',
  plugins: [react()],
  server: {
    port: 3000,
  },
})
