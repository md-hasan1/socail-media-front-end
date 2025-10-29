/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { useRegisterUserMutation } from "@/redux/features/api/authApi"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface IRegisterUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const initialState: IRegisterUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
}
export default function RegistrationForm() {
    const [ showPassword, setShowPassword ] = useState(false)
    const router = useRouter();

    const [ user, setUser ] = useState<IRegisterUser>(initialState);
    const [ registrationMutation, { isLoading: registrationLoading } ] = useRegisterUserMutation();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [ name ]: value });
    }

    const handleRegisterUser = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await registrationMutation(user).unwrap();
            toast.success("Check your email to verify your account.");
            router.push(`/auth/verify?email=${user?.email}`);
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
                        Create your account!
                    </h1>
                    <p className="text-center text-gray-700 text-muted-foreground">
                        Welcome To Website Name
                    </p>
                    <p className="text-sm text-gray-700 text-center text-muted-foreground">
                        Please Enter The Information Requested To Create Your Account
                    </p>
                </div>

                <form
                    onSubmit={handleRegisterUser}
                    className="space-y-4">
                    <div className="grid grid-cols-1 my-4 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-lg text-gray-700 font-medium">
                                First Name
                            </label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChange}
                                className=" rounded border-gray-500"
                                placeholder="John"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-lg text-gray-700 font-medium">
                                Last Name
                            </label>
                            <Input
                                onChange={handleChange}
                                id="lastName"
                                name="lastName"
                                value={user.lastName}
                                className=" rounded border-gray-500"
                                placeholder="Doe"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2 my-4">
                        <label htmlFor="email" className="text-lg text-gray-700 font-medium">
                            Email Address
                        </label>
                        <Input
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            type="email"
                            className=" rounded border-gray-500"
                            placeholder="someone@email.com"
                            required
                        />
                    </div>

                    <div className="space-y-2 my-4">
                        <label htmlFor="password" className="text-lg text-gray-700 font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
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

                    <Button loading={registrationLoading} className="w-full bg-[#00008B] hover:bg-[#00008B]/90 rounded" type="submit">
                        Register Account
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                or with
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {/* <Button variant="outline" className="w-full border-2 border-gray-500 rounded py-4" type="button">
                            <SiApple className=" mr-2" />
                            Continue with Apple
                        </Button> */}
                        <Button variant="outline" className="w-full border-2 border-gray-500 rounded py-4" type="button">
                            <FcGoogle size={24} className=" mr-2" />
                            Continue with Google
                        </Button>
                    </div>
                </form>

                <p className="text-center text-lg text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-[#00008B] hover:underline">
                        log in Here!
                    </Link>
                </p>
            </div>
        </div>
    )
}

