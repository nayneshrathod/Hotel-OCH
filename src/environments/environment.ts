// ─────────────────────────────────────────────────────────────────────────────
//  environment.ts — Hotel OCH Firebase Configuration (REAL CREDENTIALS)
// ─────────────────────────────────────────────────────────────────────────────
export const environment = {
  production: false,
  firebaseEnabled: true,   // ✅ Firebase is now enabled

  firebase: {
    apiKey: 'AIzaSyDNPw6PDAbFr8IPsfuCHvF5SgRKpCreDhw',
    authDomain: 'hotelbilloch.firebaseapp.com',
    projectId: 'hotelbilloch',
    storageBucket: 'hotelbilloch.firebasestorage.app',
    messagingSenderId: '141616535695',
    appId: '1:141616535695:web:7157db09fde3f0016378fa',
    measurementId: 'G-FG4YKHF7S4',
  },

  billPrefix: 'OCH',

  useRealImageGen: false,        // Set true + add Replicate key to enable AI images
  replicateApiKey: 'YOUR_REPLICATE_KEY',
  replicateModel: 'stability-ai/sdxl:39ed52f2319f9...',
};
