import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/user/login':{
        target:'http://localhost:5000',
        changeOrigin:true
      },
      '/user/register':{
        target:'http://localhost:5000',
        changeOrigin:true
      },
      '/user/setavatar':{
        target:'http://localhost:5000',
        changeOrigin:true
      },
      '/user/allcontacts':{
        target:'http://localhost:5000',
        changeOrigin:true
      },
      '/message/add':{
        target:'http://localhost:5000',
        changeOrigin:true
      },
      '/message/getAll':{
        target:'http://localhost:5000',
        changeOrigin:true
      },
      }
  }
})
