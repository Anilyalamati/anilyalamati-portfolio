import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
//
// The heavy 3D stack (three, @react-three/fiber, drei) is only imported
// from src/components/three/Scene.tsx, which is loaded via React.lazy in
// HeroVisual.tsx — so the bundler already emits it as its own async chunk
// and the initial page load stays light.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
