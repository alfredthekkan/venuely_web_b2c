"use client";
import React from 'react'
import { auth } from '@/firebase'
import {
    ConfirmationResult,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    User
} from 'firebase/auth'
import { FormEvent, useEffect, useState, useTransition } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Input  } from './ui/input';
import { Button } from './ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import NameCollection from './NameCollection';

export default function OtpLogin() {
    const router = useRouter()
    const [phoneNumber, setPhoneNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState("")
    const [resentCountdown, setResendCountDown] = useState(0)
    const [recaptchaVerifier, setRecapthaVerifier] = useState<RecaptchaVerifier | null>()
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>()
    const [isPending, startTransition] = useTransition()
    const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null)
    const [showNameCollection, setShowNameCollection] = useState(false)

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resentCountdown > 0) {
            timer = setTimeout(() => setResendCountDown(resentCountdown - 1), 1000);
        }

        return () => clearTimeout(timer)
    }, [resentCountdown])

    useEffect(() => {
        try {
            console.log('Creating RecaptchaVerifier...');
            const recaptchaVerifier = new RecaptchaVerifier(
                auth, "recaptcha-container", { 
                    size: "invisible",
                    callback: (response: any) => {
                        console.log("reCAPTCHA solved:", response);
                    },
                    'expired-callback': () => {
                        console.log("reCAPTCHA expired");
                        setError("reCAPTCHA expired. Please try again.");
                    },
                    'error-callback': (error: any) => {
                        console.error("reCAPTCHA error:", error);
                        setError("reCAPTCHA verification failed. Please try again.");
                    }
                }
            )
            console.log('RecaptchaVerifier created successfully');
            setRecapthaVerifier(recaptchaVerifier)
            return(() => { 
                recaptchaVerifier.clear()
            })
        } catch (error) {
            console.error('Error creating RecaptchaVerifier:', error);
            setError('Failed to initialize reCAPTCHA. Please refresh the page.');
        }
    }, [auth])

    useEffect(() => {
        if (otp.length === 6) {
            verifyOtp()
        }
    }, [otp])

    const searchParams = useSearchParams()

    const verifyOtp = async () => {
        startTransition(async () => {
            setError("")
            if (!confirmationResult) {
                setError("Please request otp first")
                return;
            }

            try {
                const userCredential = await confirmationResult.confirm(otp);
                const user = userCredential.user;
                
                console.log('OTP verified successfully for user:', user.uid);
                console.log('User displayName:', user.displayName);
                
                // Check if user already has a displayName
                if (user.displayName && user.displayName.trim() !== '') {
                    // Existing user with name - proceed with redirect
                    console.log('Returning user with name:', user.displayName);
                    if (searchParams.get('redirect')) {
                        const route = searchParams.get('redirect') 
                        console.log('Redirecting to:', route)
                        router.push(route!)
                    }else {
                        console.log("No redirect found, going to home")
                        router.push("/home")
                    }
                } else {
                    // New user without name - show name collection screen
                    console.log('New user without displayName, showing name collection');
                    setAuthenticatedUser(user);
                    setShowNameCollection(true);
                }
            }catch(error) {
                setError(`Failed to verify the otp. please check otp first.${error}`)
            }
        }
        )
    }

    const requestOtp = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        
        // Enhanced phone number validation
        const cleanNumber = phoneNumber.replace(/\s+/g, '').replace(/[^\+\d]/g, '');
        
        // Must start with +, followed by 1-3 digit country code, then 4-14 digits
        const phoneRegex = /^\+[1-9]\d{6,14}$/;
        
        if (!phoneRegex.test(cleanNumber)) {
            setError("Please enter a valid phone number with country code (e.g., +911234567890)");
            return;
        }

        // Use cleaned number
        const formattedNumber = cleanNumber;
        
        setResendCountDown(60)
        startTransition(async () => {
            setError("")
            if (!recaptchaVerifier) {
                setError("Recaptcha verifier failed to initiialize")
                return;
            }
            try {
                console.log('Sending OTP to:', formattedNumber);
                
                if (!recaptchaVerifier) {
                    throw new Error('RecaptchaVerifier is null');
                }
                
                const confirmationResult = await signInWithPhoneNumber(
                    auth, formattedNumber, recaptchaVerifier!
                )
                setConfirmationResult(confirmationResult)
                setSuccess("Successfully send OTP")
            }catch(error: any) {
                console.error('Firebase phone auth error:', error)
                console.error('Error code:', error.code)
                console.error('Error message:', error.message)
                setResendCountDown(0);
                
                switch(error.code) {
                    case "auth/invalid-phone-number":
                        setError("Invalid phone number format. Please include country code (e.g., +1234567890)")
                        break;
                    case "auth/too-many-requests":
                        setError("Too many requests. Please try again later...")
                        break;
                    case "auth/quota-exceeded":
                        setError("SMS quota exceeded. Please try again later.")
                        break;
                    case "auth/billing-not-enabled":
                        setError("Phone authentication requires billing to be enabled.")
                        break;
                    case "auth/project-not-whitelisted":
                        setError("This project is not authorized for phone authentication.")
                        break;
                    case "auth/app-not-authorized":
                        setError("This app domain is not authorized for Firebase Authentication.")
                        break;
                    case "auth/captcha-check-failed":
                        setError("reCAPTCHA verification failed. Please try again.")
                        break;
                    case "auth/invalid-app-credential":
                        setError("Firebase configuration error. Please check your API keys and project settings.")
                        break;
                    default:
                        setError(`Authentication failed: ${error.message || 'Unknown error'}`)
                }
            }
        })
    }

  // Show name collection screen if user authenticated but no displayName
  if (showNameCollection && authenticatedUser) {
    return <NameCollection user={authenticatedUser} onComplete={() => {
      if (searchParams.get('redirect')) {
        const route = searchParams.get('redirect') 
        router.push(route!)
      } else {
        router.push("/home")
      }
    }} />
  }

  return (
    <div className='flex flex-col items-center'>
        {!confirmationResult && (
            <form onSubmit={requestOtp}>
                <h1 className='font-semibold mb-2' style={{ color: 'hsl(var(--foreground))' }}>Please Enter your phone number</h1>
                <Input 
                    type='tel' 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--brand-border))',
                        color: 'hsl(var(--foreground))'
                    }}
                />
                <p className='text-xs mt-2' style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Please enter your number with the country code (i.e, +91 for India)
                </p>
            </form>
        )}

        {confirmationResult && (
            <>
            <h1 className='font-semibold mb-2' style={{ color: 'hsl(var(--foreground))' }}>Please Enter your OTP</h1>
            <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                <InputOTPGroup>
                    <InputOTPSlot index={0}/>
                    <InputOTPSlot index={1}/>
                    <InputOTPSlot index={2}/>
                </InputOTPGroup>
                <InputOTPSeparator/>
                <InputOTPGroup>
                    <InputOTPSlot index={3}/>
                    <InputOTPSlot index={4}/>
                    <InputOTPSlot index={5}/>
                </InputOTPGroup>
            </InputOTP>
            </>
        )}
        
        {!confirmationResult && (
          <Button 
            onClick={() => requestOtp()} 
            disabled={!phoneNumber || isPending || resentCountdown > 0} 
            className='mt-5'
            style={{
              backgroundColor: 'hsl(var(--brand-button-primary))',
              color: 'hsl(var(--brand-button-primary-foreground))'
            }}
          >
              {resentCountdown > 0 ? `Resend OTP in ${resentCountdown}` : isPending ? "Sending OTP": "Send OTP"}
          </Button>
        )}
        
        {confirmationResult && (
          <Button 
            onClick={verifyOtp} 
            disabled={!otp || otp.length !== 6 || isPending} 
            className='mt-5'
            style={{
              backgroundColor: 'hsl(var(--brand-button-primary))',
              color: 'hsl(var(--brand-button-primary-foreground))'
            }}
          >
              {isPending ? "Verifying..." : "Verify OTP"}
          </Button>
        )}
        
        <div className="p-10 text-center">
            {error && <p style={{ color: 'hsl(var(--destructive))' }}>{error}</p>}
            {success && <p style={{ color: 'hsl(var(--brand-primary))' }}>{success}</p>}
        </div>
        <div id="recaptcha-container"/>
    </div>
  )
}
