// environment.prod.ts — Production environment
export const environment = {
  production: true,

  firebase: {
    apiKey: 'AIzaSyDNPw6PDAbFr8IPsfuCHvF5SgRKpCreDhw',
    authDomain: 'hotelbilloch.firebaseapp.com',
    projectId: 'hotelbilloch',
    storageBucket: 'hotelbilloch.firebasestorage.app',
    messagingSenderId: '141616535695',
    appId: '1:141616535695:web:7157db09fde3f0016378fa',
    measurementId: 'G-FG4YKHF7S4',
  },

  useRealImageGen: false,
  replicateApiKey: 'YOUR_REPLICATE_API_KEY',
  replicateModel: 'stability-ai/sdxl:39ed52f2319f9dacc38d900cd8585f30f7fd2a7a1a2b0ef3ea6a2b7e10c37b6c',

  gstCgstRate: 0.025,
  gstSgstRate: 0.025,
  billPrefix: 'HTL',
  defaultWaiter: 'Service Staff',
};
