import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps : {
    include : ['dompurify']
  },
  resolve : {
    alias : {
      'dompurify' : 'dompurify'
    }
  },
  server : {
    port : 3001,
    open : true,
    hmr : {
      overlay : false
    }
  }
})
