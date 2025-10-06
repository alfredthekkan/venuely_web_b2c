"use client";
import React from 'react'
import { useAuth  } from '@/context/AuthContext'
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import Link  from 'next/link';

export default function Home() {

    const { user } = useAuth()

    const logout = () => signOut(auth)

    return (
        <div>
            {user ? (
                <p>You are logged in as {user?.uid}</p>
            ) : (
                <p>You are not logged in </p>
            )};
        
            {user ? (
                <Button onClick={logout}className="mt-10">Sign Out</Button>
            ): (
                <Link href="/login">    
                    <Button onClick={logout} className="mt-10">Sign In</Button>
                </Link>
            )}
        </div>
    );
}
