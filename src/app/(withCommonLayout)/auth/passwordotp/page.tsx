/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react'
import { useState, useRef, KeyboardEvent, ClipboardEvent, FormEvent } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
import { useResendOTPMutation, useVerifyEmailMutation } from "@/redux/features/api/authApi"

export default function VerificationPage() {
    const [ verificationCode, setVerificationCode ] = useState<string>(""); // Start with an empty string
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const [ verifyEmailMutation, { isLoading: verifyEmailLoading } ] = useVerifyEmailMutation();
    const [ resendOTPMutation, { isLoading: resendOTPLoading } ] = useResendOTPMutation();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newCodeArray = verificationCode.split("");
            newCodeArray[ index ] = value;
            const newCode = newCodeArray.join("");
            setVerificationCode(newCode);

            // Move to next input if value is entered
            if (value && index < 3) { // Adjusted index to 3 since we have 4 inputs (0-3)
                inputRefs.current[ index + 1 ]?.focus();
            }
        }
    };

    const handleVerifyOTP = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (!email) {
                toast.error("Please try to login or register again.");
                return;
            }
            const response = await verifyEmailMutation({ email, otp: verificationCode }).unwrap();
            toast.success("Verification Completed.");
          
            router.push(`/auth/resetPassword?email=${email}`)
        } catch (error) {
            toast.error((error as { data: { message: string } }).data?.message);
        }
    };

    const handleResendOTP = async () => {
        try {
            if (!email) {
                toast.error("Please try to login or register again.");
                return;
            }
            const response = await resendOTPMutation({ email }).unwrap();
            toast.success("Check your email.");
    
        } catch (error) {
            toast.error((error as { data: { message: string } }).data?.message);
        }
    }

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !verificationCode[ index ] && index > 0) {
            // Move focus to previous input when backspace is pressed on an empty input
            inputRefs.current[ index - 1 ]?.focus();
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[ index - 1 ]?.focus();
        } else if (e.key === "ArrowRight" && index < 3) {
            inputRefs.current[ index + 1 ]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 4);
        if (/^[0-9]{1,4}$/.test(pastedData)) {
            const newCodeArray = verificationCode.split("");
            pastedData.split("").forEach((char, index) => {
                if (index < 4) newCodeArray[ index ] = char;
            });
            setVerificationCode(newCodeArray.join(""));
            inputRefs.current[ Math.min(3, pastedData.length - 1) ]?.focus();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-title text-2xl md:text-4xl font-bold">
                        <Link href={"/"}>LOGO</Link>
                    </h1>
                    <CheckCircle className="w-16 h-16 text-[#00008B]" />
                    <h1 className="text-2xl font-semibold">Success</h1>
                    <p className="text-center text-muted-foreground">
                        Please Check Your Email And Enter The OTP.
                    </p>
                </div>

                <form onSubmit={handleVerifyOTP} className="space-y-6">
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[ index ] = el
                                }}
                                type="text"
                                inputMode="numeric"
                                required
                                maxLength={1}
                                value={verificationCode[ index ] || ""} // Display empty string if no value
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-12 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00008B] focus:border-transparent"
                                aria-label={`Digit ${index + 1} of verification code`}
                            />
                        ))}
                    </div>
                    <Button size={"sm"} loading={resendOTPLoading} disabled={verifyEmailLoading || resendOTPLoading} onClick={handleResendOTP} type="button" className=" bg-primary text-white rounded underline">Resend OTP</Button>

                    <Button
                        loading={verifyEmailLoading}
                        disabled={verifyEmailLoading || resendOTPLoading}
                        type="submit"
                        className="w-full bg-[#00008B] hover:bg-[#00008B]/90"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
}
