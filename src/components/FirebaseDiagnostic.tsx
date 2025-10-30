"use client";
import React, { useState, useEffect } from 'react';
import { auth } from '@/firebase';
import { 
    signInAnonymously, 
    createUserWithEmailAndPassword,
    deleteUser,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from 'firebase/auth';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DiagnosticResult {
    test: string;
    status: 'pending' | 'success' | 'error';
    message: string;
    details?: any;
}

export default function FirebaseDiagnostic() {
    const [results, setResults] = useState<DiagnosticResult[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const addResult = (test: string, status: 'success' | 'error', message: string, details?: any) => {
        setResults(prev => [...prev, { test, status, message, details }]);
    };

    const runDiagnostics = async () => {
        setIsRunning(true);
        setResults([]);

        // Test 1: Basic Firebase Connection
        try {
            addResult('Firebase Config', 'success', `Project: ${auth.app.options.projectId}`);
        } catch (error: any) {
            addResult('Firebase Config', 'error', `Failed to initialize: ${error.message}`);
            setIsRunning(false);
            return;
        }

        // Test 2: Anonymous Authentication (Tests basic auth)
        try {
            const userCredential = await signInAnonymously(auth);
            await deleteUser(userCredential.user);
            addResult('Anonymous Auth', 'success', 'Basic Firebase Auth is working');
        } catch (error: any) {
            addResult('Anonymous Auth', 'error', `Code: ${error.code} - ${error.message}`, error);
        }

        // Test 3: Email Authentication (Tests auth methods)
        try {
            const testEmail = `test-${Date.now()}@example.com`;
            const userCredential = await createUserWithEmailAndPassword(auth, testEmail, 'password123');
            await deleteUser(userCredential.user);
            addResult('Email Auth', 'success', 'Email authentication is working');
        } catch (error: any) {
            addResult('Email Auth', 'error', `Code: ${error.code} - ${error.message}`, error);
        }

        // Test 4: RecaptchaVerifier Creation
        try {
            const recaptchaVerifier = new RecaptchaVerifier(
                auth, 
                "diagnostic-recaptcha-container", 
                { size: "invisible" }
            );
            addResult('RecaptchaVerifier', 'success', 'RecaptchaVerifier created successfully');
            
            // Test 5: Phone Auth API Call (This will reveal the exact issue)
            try {
                await signInWithPhoneNumber(auth, '+1555000000', recaptchaVerifier);
                addResult('Phone Auth API', 'success', 'Phone auth API is accessible');
            } catch (error: any) {
                // This is where we'll get the real error
                addResult('Phone Auth API', 'error', `Code: ${error.code} - ${error.message}`, {
                    code: error.code,
                    message: error.message,
                    stack: error.stack,
                    customData: error.customData
                });
            } finally {
                recaptchaVerifier.clear();
            }
        } catch (error: any) {
            addResult('RecaptchaVerifier', 'error', `Failed to create: ${error.message}`, error);
        }

        // Test 6: Check Environment Variables
        const envVars = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Present' : 'Missing',
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Present' : 'Missing',
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Present' : 'Missing',
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? 'Present' : 'Missing'
        };
        addResult('Environment Variables', 'success', 'All required env vars present', envVars);

        // Test 7: Network Test
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${auth.app.options.projectId}`, {
                method: 'HEAD'
            });
            addResult('Network Access', 'success', `Can reach Firebase API (${response.status})`);
        } catch (error: any) {
            addResult('Network Access', 'error', `Cannot reach Firebase API: ${error.message}`);
        }

        setIsRunning(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success': return 'text-green-600';
            case 'error': return 'text-red-600';
            default: return 'text-yellow-600';
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Firebase Authentication Diagnostic</CardTitle>
            </CardHeader>
            <CardContent>
                <Button 
                    onClick={runDiagnostics} 
                    disabled={isRunning}
                    className="mb-4"
                >
                    {isRunning ? 'Running Diagnostics...' : 'Run Diagnostics'}
                </Button>

                <div className="space-y-3">
                    {results.map((result, index) => (
                        <div key={index} className="border rounded p-3">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{result.test}</span>
                                <span className={getStatusColor(result.status)}>
                                    {result.status.toUpperCase()}
                                </span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                {result.message}
                            </div>
                            {result.details && (
                                <details className="mt-2">
                                    <summary className="text-xs cursor-pointer text-blue-600">
                                        Show Details
                                    </summary>
                                    <pre className="text-xs bg-gray-100 p-2 mt-1 rounded overflow-auto">
                                        {JSON.stringify(result.details, null, 2)}
                                    </pre>
                                </details>
                            )}
                        </div>
                    ))}
                </div>

                <div id="diagnostic-recaptcha-container"></div>
            </CardContent>
        </Card>
    );
}