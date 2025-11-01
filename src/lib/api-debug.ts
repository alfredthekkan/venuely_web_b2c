// Debug utility to check API URLs
import { createApiClient, getCurrentApiUrl, logApiEnvironment } from '@/lib/api-config';

// Initialize and log API environment on app start
export const initializeApiDebug = () => {
  console.log('🚀 Venuely API Debug Info:');
  console.log('='.repeat(40));
  logApiEnvironment();
  console.log('='.repeat(40));
};

// Test API connectivity
export const testApiConnection = async () => {
  try {
    const apiClient = createApiClient();
    console.log('🧪 Testing API connection...');
    console.log(`📡 Target URL: ${getCurrentApiUrl()}`);
    
    // You can add a simple API call here to test connectivity
    // For now, just show configuration
    console.log('✅ API client created successfully');
    return true;
  } catch (error) {
    console.error('❌ API connection test failed:', error);
    return false;
  }
};

// Add this to your main app component to see API info in console
export const debugCurrentApi = () => {
  const currentUrl = getCurrentApiUrl();
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';
  
  return {
    environment,
    baseUrl: currentUrl,
    isProduction: environment === 'production',
    isUAT: currentUrl.includes('kfvk76r6nq'),
    isProd: currentUrl.includes('pfgu2skrmq')
  };
};