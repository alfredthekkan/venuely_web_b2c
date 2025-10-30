"use client";
import React, { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { UserIcon } from 'lucide-react';

interface NameCollectionProps {
  user: User;
  onComplete: () => void;
  redirectPath?: string;
}

export default function NameCollection({ user, onComplete, redirectPath }: NameCollectionProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    startTransition(async () => {
      try {
        setError(null);
        
        // Update Firebase user profile
        await updateProfile(user, {
          displayName: name.trim()
        });

        // Force token refresh to update user claims
        await user.getIdToken(true);
        
        console.log('User profile updated successfully:', name.trim());
        console.log('Updated user displayName:', user.displayName);
        
        // Call completion callback
        onComplete();
        
        // Navigate to redirect path or home
        if (redirectPath) {
          router.push(redirectPath);
        } else {
          router.push('/home');
        }
        
      } catch (error: any) {
        console.error('Error updating user profile:', error);
        setError('Failed to save your name. Please try again.');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      backgroundColor: 'hsl(var(--brand-background))'
    }}>
      <Card className="w-full max-w-md border shadow-xl backdrop-blur-sm rounded-lg" style={{
        backgroundColor: 'hsl(var(--background))',
        borderColor: 'hsl(var(--brand-border))'
      }}>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center" style={{
            backgroundColor: 'hsl(var(--brand-primary) / 0.1)'
          }}>
            <UserIcon className="w-6 h-6" style={{ color: 'hsl(var(--brand-primary))' }} />
          </div>
          <CardTitle className="text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
            Welcome! What&apos;s your name?
          </CardTitle>
          <p className="text-sm mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            We&apos;ll use this for your bookings and reservations
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                style={{
                  borderColor: 'hsl(var(--brand-border))',
                  backgroundColor: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))'
                }}
                disabled={isPending}
                autoFocus
              />
            </div>
            
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            
            <Button
              type="submit"
              className="w-full font-semibold shadow-lg transition-colors duration-200"
              style={{
                backgroundColor: 'hsl(var(--brand-button-primary))',
                color: 'hsl(var(--brand-button-primary-foreground))'
              }}
              disabled={isPending || !name.trim()}
            >
              {isPending ? 'Saving...' : 'Continue'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}