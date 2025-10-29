/* eslint-disable @typescript-eslint/no-unused-vars */


"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForgotPasswordMutation } from "@/redux/features/api/authApi"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast"


export default function RegistrationForm() {
    const [ forgotPasswordMutation, { isLoading: forgotPasswordLoading } ] = useForgotPasswordMutation();
    const [ email, setEmail ] = useState("");
    const router = useRouter();
    const handleForgotPassword = async (e: FormEvent) => {
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }
        e.preventDefault();
        try {
            const response = await forgotPasswordMutation({ email }).unwrap();
            toast.success("Check your email to complete verification");
          
            router.push(`/auth/passwordotp?email=${email}`);
        } catch (error) {
            toast.error((error as { data: { message: string } }).data?.message);
        }

    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xl space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <h1 className="text-title text-2xl md:text-4xl font-bold">
                        <Link href={"/"}>LOGO</Link>
                    </h1>
                    <h1 className="text-4xl text-gray-800 font-semibold tracking-tight">
                        Forgot Password!
                    </h1>
                    <p className="text-center text-gray-700 text-lg text-muted-foreground">
                        Enter your registered email below
                    </p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2 my-4">
                        <label htmlFor="email" className="text-lg text-gray-700 font-medium">
                            Email Address
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            className="rounded border-gray-500"
                            placeholder="someone@email.com"
                            required
                        />
                    </div>

                    <Button loading={forgotPasswordLoading} disabled={forgotPasswordLoading} className="w-full bg-[#00008B] hover:bg-[#00008B]/90 rounded" type="submit">
                        Send Code
                    </Button>
                </form>

                <p className="text-center text-lg text-muted-foreground">
                    Remember The Password?
                    <Link href="/auth/login" className="text-[#00008B] hover:underline">
                        Log In!
                    </Link>
                </p>
            </div>
        </div>
    )
}
