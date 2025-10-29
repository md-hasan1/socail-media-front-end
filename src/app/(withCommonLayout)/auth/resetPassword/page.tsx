"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useResetPasswordMutation } from "@/redux/features/api/authApi"
import toast from "react-hot-toast"

export default function RegistrationForm() {
    const [ showPassword, setShowPassword ] = useState(false)
    const [ password, setPassword ] = useState("");
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const [ resetPasswordMutation, { isLoading: resetPasswordLoading } ] = useResetPasswordMutation();

    const router = useRouter();
    const handleResetPassword = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (!email) {
                toast.error("Not authorized!");
                // router.back();
                return;
            }
             await resetPasswordMutation({ email, newPassword: password }).unwrap();
            toast.success("Successfully changed password.");
            
            router.push("/auth/login")
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
                    <h1 className="text-4xl text-gray-700 font-semibold tracking-tight">
                        Create New Password!
                    </h1>
                    <p className="text-center text-gray-700 text-muted-foreground">
                        Enter a different password with the previous!
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleResetPassword}>
                    <div className="space-y-2 my-4">
                        <label htmlFor="password" className="text-lg text-gray-700 font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                value={password}
                                minLength={8}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                className=" rounded border-gray-500"
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-4 w-4" />
                                ) : (
                                    <EyeIcon className="h-4 w-4" />
                                )}
                                <span className="sr-only">
                                    {showPassword ? "Hide password" : "Show password"}
                                </span>
                            </Button>
                        </div>
                    </div>

                    <Button loading={resetPasswordLoading} disabled={resetPasswordLoading} className="w-full bg-[#00008B] hover:bg-[#00008B]/90 rounded" type="submit">
                        Reset Password
                    </Button>

                </form>

            </div>
        </div>
    )
}

