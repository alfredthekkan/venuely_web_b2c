// Environment-aware API configuration
import { WidgetApi, Configuration } from '@/lib/api';

// Define your environment URLs
const API_URLS = {
  development: 'https://firebase-entrypoint-kfvk76r6nq-uc.a.run.app', // UAT
  staging: 'https://firebase-entrypoint-kfvk76r6nq-uc.a.run.app',     // UAT  
  production: 'https://firebase-entrypoint-pfgu2skrmq-uc.a.run.app'   // Prod
} as const;

// Get current environment
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as keyof typeof API_URLS || 'development';

// Create API configuration with environment-specific base URL
export const createApiConfig = (accessToken?: string) => {
  return new Configuration({
    basePath: API_URLS[environment],
    accessToken: accessToken || undefined,
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

// Create API instance with environment-specific config
export const createApiClient = (accessToken?: string) => {
  return new WidgetApi(createApiConfig(accessToken));
};

// Helper to get current API base URL
export const getCurrentApiUrl = () => API_URLS[environment];

// Helper to log which environment is being used
export const logApiEnvironment = () => {
  console.log(`🌐 API Environment: ${environment}`);
  console.log(`🔗 Base URL: ${API_URLS[environment]}`);
};