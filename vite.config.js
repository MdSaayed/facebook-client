
// not working npm run build
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    mainFields: []
  }
});



/* ===============not working npm run dev========================= */

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// const isProduction = process.env.NODE_ENV === 'production';

// export default defineConfig({
//   plugins: [react()],
//   resolve: isProduction ? {
//     alias: {
//       'stream': 'stream-browserify',
//       'util': 'util',
//     },
//   } : {},
//   build: {
//     rollupOptions: {
//       plugins: [],
//     },
//   },
//   server: {
//     port: 3000,
//   },
// });


/*
1. after 4days login system  is not working
2. .env is not working
3. 

 */