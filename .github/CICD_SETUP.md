# GitHub Actions CI/CD Setup Guide

## Overview
This guide will help you set up automated deployments to Vercel whenever you push to the `main` branch.

## Required GitHub Secrets

You need to add the following secrets to your GitHub repository:

### 1. Vercel Configuration Secrets
- **VERCEL_TOKEN**: Your personal Vercel token
- **VERCEL_ORG_ID**: `team_Rp3iMtp6W3TdtXruRAiJXTCG`
- **VERCEL_PROJECT_ID**: `prj_lOLL2fBpeZLd0TOz6j8visPh8n9k`

### 2. Firebase Environment Variables
Copy these from your `.env.production` file:
- **NEXT_PUBLIC_FIREBASE_API_KEY**: `AIzaSyDB0pA4uBtqtTy4mrgWqsqOcFDdK-J4GCQ`
- **NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN**: `appointments-451706.firebaseapp.com`
- **NEXT_PUBLIC_FIREBASE_PROJECT_ID**: `appointments-451706`
- **NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET**: `appointments-451706.firebasestorage.app`
- **NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID**: `179402142261`
- **NEXT_PUBLIC_FIREBASE_APP_ID**: `1:179402142261:web:77677e27faf42fe19cf77c`

## Steps to Configure

### Step 1: Get Vercel Token
1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
2. Create a new token with a descriptive name like "GitHub Actions - Venuely Widget"
3. Copy the token (you'll only see it once!)

### Step 2: Add Secrets to GitHub
1. Go to your GitHub repository: `https://github.com/alfredthekkan/venuely_web_b2c`
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** for each secret listed above

### Step 3: Test the Workflow
1. Make a small change to your code
2. Commit and push to the `main` branch:
   ```bash
   git add .
   git commit -m "Test CI/CD pipeline"
   git push origin main
   ```
3. Go to the **Actions** tab in your GitHub repository to watch the deployment

## Workflow Features

The GitHub Actions workflow will:
- ✅ Install dependencies
- ✅ Generate API client from OpenAPI spec
- ✅ Run ESLint checks
- ✅ Build the application with production environment variables
- ✅ Deploy to Vercel automatically
- ✅ Update your custom domain at `https://book.venuelyapp.com`

## Benefits

- **Automated Deployments**: No more manual `vercel --prod` commands
- **Quality Checks**: ESLint runs on every deployment
- **Environment Safety**: Production secrets are securely managed
- **Fast Feedback**: See deployment status directly in GitHub
- **Rollback Support**: Easy to revert if something goes wrong

## Troubleshooting

If the deployment fails:
1. Check the **Actions** tab for error messages
2. Verify all secrets are correctly set
3. Ensure your Vercel token has the right permissions
4. Check that the Firebase environment variables are correct

## Next Steps

After setup, every push to `main` will automatically:
1. Build your app
2. Run tests and linting
3. Deploy to production
4. Update your live site at `https://book.venuelyapp.com`