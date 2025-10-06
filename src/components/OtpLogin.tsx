"use client";
import React from 'react'
import { auth } from '@/firebase'
import {
    ConfirmationResult,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from 'firebase/auth'
import { FormEvent, useEffect, useState, useTransition } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Input  } from './ui/input';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

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

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resentCountdown > 0) {
            timer = setTimeout(() => setResendCountDown(resentCountdown - 1), 1000);
        }

        return () => clearTimeout(timer)
    }, [resentCountdown])

    useEffect(() => {
        const recaptchaVerifier = new RecaptchaVerifier(
            auth, "recaptcha-container", { size: "invisible" }
        )
        setRecapthaVerifier(recaptchaVerifier)
        return(() => { recaptchaVerifier.clear()})
    }, [auth])

    useEffect(() => {
        if (otp.length === 6) {
            verifyOtp()
        }
    }, [otp])

    const verifyOtp = async () => {
        startTransition(async () => {
            setError("")
            if (!confirmationResult) {
                setError("Please request otp first")
                return;
            }

            try {
                await confirmationResult.confirm(otp);
                router.replace("/home")
            }catch(error) {
                setError("Failed to verify the otp. please check otp first.")
            }
        }
        )
    }

    const requestOtp = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setResendCountDown(60)
        startTransition(async () => {
            setError("")
            if (!recaptchaVerifier) {
                setError("Recaptcha verifier failed to initiialize")
            }
            try {
                const confirmationResult = await signInWithPhoneNumber(
                    auth, phoneNumber, recaptchaVerifier!
                )
                setConfirmationResult(confirmationResult)
                setSuccess("Successfully send OTP")
            }catch(error: any) {
                console.log(error)
                setResendCountDown(0);
                if (error.code === "auth/invalid-phone-number") {
                    setError("Invalid phone number. Please check number")
                }else if (error.code === "auth/too-many-requests") {
                    setError("Too many requests. Please try again later...")
                }else {
                    setError("Failed to send OTP. Try again later...")
                }
            }
        })
    }

  return (
    <div className='flex flex-col items-center'>
        {!confirmationResult && (
            <form onSubmit={requestOtp}>
                <h1 className='font-semibold mb-2'>Please Enter your phone number</h1>
                <Input className='text-black' type='tel' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                <p className='text-xs text-gray-400 mt-2'>
                    Please enter your number with the conuntry code (i.e, +91 for India)
                </p>
            </form>
        )}

        {confirmationResult && (
            <>
            <h1 className='font-semibold mb-2'>Please Enter your phone number</h1>
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
        <Button onClick={() => requestOtp()} disabled={!phoneNumber || isPending || resentCountdown > 0} className='mt-5'>
            {resentCountdown > 0 ? `Resend Otp in ${resentCountdown}` : isPending ? "Sending Otp": "Send Otp"}
        </Button>
        <div className="p-10 text-center">
            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>{success}</p>}
        </div>
        <div id="recaptcha-container"/>
    </div>
  )
}
