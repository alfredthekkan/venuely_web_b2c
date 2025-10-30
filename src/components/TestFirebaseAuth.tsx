"use client";
import React, { useState } from 'react';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function TestFirebaseAuth() {
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('password123');
    const [result, setResult] = useState('');

    const testAuth = async () => {
        try {
            setResult('Testing...');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setResult(`Success! User: ${userCredential.user.email}`);
        } catch (error: any) {
            setResult(`Error: ${error.code} - ${error.message}`);
        }
    };

    return (
        <div className="p-4 border rounded">
            <h3>Firebase Auth Test</h3>
            <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="mb-2"
            />
            <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mb-2"
            />
            <Button onClick={testAuth}>Test Email Auth</Button>
            <div className="mt-2">
                <strong>Result:</strong> {result}
            </div>
        </div>
    );
}