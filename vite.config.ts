import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from 'fs';
import * as path from 'path';

const configFirebaseMessaging = () => ({
  name: 'config-firebase-messaging',
  configResolved(config) {
    const publicPath = `${__dirname}/public`;
    const script = [
      `var firebaseMessagingConfig = {`,
      `  apiKey: '${config.env['VITE_FIREBASE_API_KEY'] || ''}',`,
      `  authDomain: '${config.env['VITE_FIREBASE_AUTH_DOMAIN'] || ''}',`,
      `  projectId: '${config.env['VITE_FIREBASE_PROJECT_ID'] || ''}',`,
      `  storageBucket: '${config.env['VITE_FIREBASE_STORAGE_BUCKET'] || ''}',`,
      `  messagingSenderId: '${config.env['VITE_FIREBASE_MESSAGING_SENDER_ID'] || ''}',`,
      `  appId: '${config.env['VITE_FIREBASE_APP_ID'] || ''}',`,
      `  measurementId: '${config.env['VITE_FIREBASE_MEASUREMENT_ID'] || ''}',`,
      `};`,
    ].join('\n');
    fs.writeFileSync(`${publicPath}/firebase-messaging-config.js`, script);
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    react(),
    configFirebaseMessaging(),
  ],
})
