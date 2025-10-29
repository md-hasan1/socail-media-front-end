/* eslint-disable @typescript-eslint/no-unused-vars */


"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import { jwtDecode } from "jwt-decode";
// import { FcGoogle } from "react-icons/fc"
// import { SiApple } from "react-icons/si"
import { useLazyGoogleLoginQuery, useLoginUserMutation } from "@/redux/features/api/authApi"
import toast from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { setToken, setUser } from "@/redux/features/slices/authSlice"
import { useAppDispatch } from "@/redux/hooks"
import { FcGoogle } from "react-icons/fc"

interface IRegisterUser {
  email: string;
  password: string;
}

const initialState: IRegisterUser = {
    email: "",
    password: "",
}

export default function RegistrationForm() {
    const [ showPassword, setShowPassword ] = useState(false)
    const [ loginInfo, setLoginInfo ] = useState<IRegisterUser>(initialState);
    const router = useRouter();
    const [ loginMutation, { isLoading: loginLoading } ] = useLoginUserMutation();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams()
    const accessTokenFromGoogleLogin = searchParams.get("accessToken");


    const handleGoogleLogin = async () => {
        try {

            const response = router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`)
        
        } catch (err) {
            console.error('Google Login Error:', err);
        }
    };


    useEffect(() => {
        if (accessTokenFromGoogleLogin) {
            try {
                const accessToken = accessTokenFromGoogleLogin;
                toast.success("Login Successful.");
                const decodeData = jwtDecode(accessToken);
                dispatch(setUser(decodeData));
                dispatch(setToken(accessToken));
                router.push("/");
                localStorage.setItem("accessToken", accessToken);
            } catch (error) {
                if ((error as { data: { message: string } }).data?.message === "User is not verified!") {
                 
                }
                toast.error((error as { data: { message: string } }).data?.message?? "Failed to login");
            }
        }
    }, [ accessTokenFromGoogleLogin, dispatch, router ]);




  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await loginMutation(loginInfo).unwrap();
            toast.success(response?.message);
            const decodeData = jwtDecode(response?.data?.accessToken);
            dispatch(setUser(decodeData));
            dispatch(setToken(response?.data?.accessToken));
            localStorage.setItem("accessToken", response?.data?.accessToken);
            router.push("/");
        } catch (error) {
            if ((error as { data: { message: string } }).data?.message === "User is not verified!") {
          
            }
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
            Hi, Welcome Back! 👋
          </h1>
          <p className="text-center text-gray-700 text-muted-foreground">
            Please enter your email and password below!
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2 my-4">
            <label
              htmlFor="email"
              className="text-lg text-gray-700 font-medium"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              value={loginInfo.email}
              onChange={handleChange}
              className="rounded border-gray-500"
              placeholder="someone@email.com"
              required
            />
          </div>

          <div className="space-y-2 my-4">
            <label
              htmlFor="password"
              className="text-lg text-gray-700 font-medium"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                value={loginInfo.password}
                onChange={handleChange}
                minLength={8}
                className="rounded border-gray-500"
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

          {/* Remember Me and Forgot Password Options */}
          <div className="flex items-center justify-between">
            <Link
              href="/auth/forgotPassword"
              className="text-lg text-[#00008B] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

                    <Button loading={loginLoading} className="w-full bg-[#00008B] hover:bg-[#00008B]/90 rounded" type="submit">
                        Log In
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
                            <SiApple className="mr-2" />
                            Continue with Apple
                        </Button> */}
                        <Button onClick={handleGoogleLogin} variant="outline" className="w-full border-2 border-gray-500 rounded py-4" type="button">
                            <FcGoogle size={24} className="mr-2" />
                            Continue with Google
                        </Button>
                    </div>



                </form>

        <p className="text-center text-lg text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-[#00008B] hover:underline"
          >
            Register Here!
          </Link>
        </p>
      </div>
    </div>
  );
}
