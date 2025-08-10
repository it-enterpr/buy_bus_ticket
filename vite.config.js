import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { // <-- PŘIDANÁ SEKCE
  host: true,
  hmr: {
    clientPort: 443,
  },
  watch: {
      usePolling: true,
  },
  // Povolení přístupu z vaší domény
  allowedHosts: ['buy.bus-ticket.info'],
},
})
