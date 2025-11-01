# API Environment Management Guide

## 🌐 Current URL Configuration

### **Generated API Client Base URL:**
- **Default**: `https://firebase-entrypoint-pfgu2skrmq-uc.a.run.app` (Production)
- **Defined in**: `src/lib/api/runtime.ts` as `BASE_PATH`

### **Available Environments:**
- **Development**: `https://firebase-entrypoint-kfvk76r6nq-uc.a.run.app` (UAT)
- **Staging**: `https://firebase-entrypoint-kfvk76r6nq-uc.a.run.app` (UAT)
- **Production**: `https://firebase-entrypoint-pfgu2skrmq-uc.a.run.app` (Prod)

## 🛠️ How to Use Environment-Aware API

### **1. Import the API Config (Recommended)**
```typescript
import { createApiClient, getCurrentApiUrl, logApiEnvironment } from '@/lib/api-config';

// Create API client that respects environment
const api = createApiClient();

// For authenticated requests
const api = createApiClient(accessToken);

// Check which URL is being used
console.log('Current API URL:', getCurrentApiUrl());
```

### **2. Old vs New Usage**

**❌ Old Way (Hard-coded URL):**
```typescript
import { DefaultApi } from '@/lib/api';
const api = new DefaultApi(); // Uses hard-coded BASE_PATH
```

**✅ New Way (Environment-aware):**
```typescript
import { createApiClient } from '@/lib/api-config';
const api = createApiClient(); // Uses environment-specific URL
```

### **3. Debug API Environment**
```typescript
import { initializeApiDebug, debugCurrentApi } from '@/lib/api-debug';

// In your main component or app startup
initializeApiDebug(); // Logs environment info to console

// Check current configuration
const apiInfo = debugCurrentApi();
console.log('API Info:', apiInfo);
```

## 🔧 How to Change Default URL

### **Method 1: Change Server Order in api.yaml**
Edit the first server in your `api.yaml`:
```yaml
servers:
  - url: https://your-preferred-default-url.com
    description: Your Default
  - url: https://other-url.com
    description: Alternative
```

Then regenerate: `npm run genapi`

### **Method 2: Override at Runtime**
```typescript
import { DefaultApi, Configuration } from '@/lib/api';

const config = new Configuration({
  basePath: 'https://your-custom-url.com',
  accessToken: token
});
const api = new DefaultApi(config);
```

## 🚀 Environment Variables

Set in your `.env` files:
```bash
# .env.development
NEXT_PUBLIC_ENVIRONMENT=development

# .env.staging  
NEXT_PUBLIC_ENVIRONMENT=staging

# .env.production
NEXT_PUBLIC_ENVIRONMENT=production
```

## 🧪 Testing Different Environments

### **Local Development:**
```bash
npm run dev              # Uses development URL (UAT)
npm run dev:staging      # Uses staging URL (UAT)  
```

### **Build for Production:**
```bash
npm run build:production # Uses production URL (Prod)
```

## 📝 Quick Check Commands

### **See Current API URL:**
```typescript
import { getCurrentApiUrl } from '@/lib/api-config';
console.log('API URL:', getCurrentApiUrl());
```

### **See Environment:**
```typescript
console.log('Environment:', process.env.NEXT_PUBLIC_ENVIRONMENT);
```

### **Full Debug Info:**
```typescript
import { debugCurrentApi } from '@/lib/api-debug';
console.log(debugCurrentApi());
```

## 🎯 URL Identification

- **UAT URL**: Contains `kfvk76r6nq`
- **Prod URL**: Contains `pfgu2skrmq`

The environment-aware system automatically picks the right URL based on your `NEXT_PUBLIC_ENVIRONMENT` variable!