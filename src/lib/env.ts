// Environment configuration helper
export const ENV = {
  isDevelopment: process.env.NEXT_PUBLIC_ENVIRONMENT === 'development',
  isStaging: process.env.NEXT_PUBLIC_ENVIRONMENT === 'staging',
  isProduction: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
  current: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
  
  // Firebase project info
  firebaseProjectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  
  // Feature flags based on environment
  features: {
    useTestPhoneNumbers: process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production',
    enableDebugLogs: process.env.NEXT_PUBLIC_ENVIRONMENT === 'development',
    enableAnalytics: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
  }
};

// Debug helper
export const debugLog = (...args: any[]) => {
  if (ENV.features.enableDebugLogs) {
    console.log('[DEBUG]', ...args);
  }
};