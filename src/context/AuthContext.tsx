"use client";
import React, { useContext, useEffect, useState, createContext } from "react";
import { auth } from "@/firebase";
import { User, onAuthStateChanged } from 'firebase/auth'

type AuthContextType = {
    user: User | null
}

const AuthContext = createContext<AuthContextType>({user :null})

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("On Auth State Changed")
            if (user != null) {
                console.log(user?.phoneNumber)
            }else {
                console.log("User is not logged in")
            }
            setUser(user || null);
        });
    
        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{user}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);