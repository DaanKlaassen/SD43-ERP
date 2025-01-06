"use client";

import Image from "next/image";
import Link from "next/link";
import {Eye, EyeOff} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import doCredentialLogin from "@/app/actions/doCredentialLogin";
import {useRouter} from "next/navigation";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {useState} from "react";

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);


    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Clear previous errors
        setError(null);

        try {
            // Get form data
            const formdata = new FormData(event.currentTarget);

            // Attempt login
            const response = await doCredentialLogin(formdata);

            if (!response.success) {
                // Display generic error message on failure
                setError("Onjuist e-mailadres of wachtwoord.");
            } else {
                // Redirect on success
                router.push(DEFAULT_LOGIN_REDIRECT);
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Onjuist e-mailadres of wachtwoord."); // Generic error message for any exceptions
        }
    };

    return (
        <div className="min-h-screen flex bg-[#081929]">
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <Image
                            src="/Logo-erp.svg"
                            alt="Zeropoint Logo"
                            width={150}
                            height={32}
                            className="text-white select-none pointer-events-none"
                        />
                    </div>

                    <h1 className="text-2xl font-semibold text-white mb-8">
                        Log in bij Zeropoint
                    </h1>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm text-gray-300"
                            >
                                E-mail
                            </label>
                            <Input
                                name="email"
                                id="email"
                                type="email"
                                required
                                className="bg-[#0B1218] border-gray-700 text-white focus:border-[#4ADE80] focus:ring-[#4ADE80]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm text-gray-300"
                            >
                                Wachtwoord
                            </label>
                            <div className="relative">
                                <Input
                                    name="password"
                                    id="password"
                                    type={showPassword ? "text" : "password"} // Dynamically set the input type
                                    required
                                    className="bg-[#0B1218] border-gray-700 text-white focus:border-[#4ADE80] focus:ring-[#4ADE80] pr-10"
                                />
                                <button
                                    type="button"
                                    onMouseDown={() => setShowPassword(true)} // Show password when holding
                                    onMouseUp={() => setShowPassword(false)} // Hide password when released
                                    onMouseLeave={() => setShowPassword(false)} // Ensure password is hidden if mouse leaves
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5"/>
                                    ) : (
                                        <Eye className="h-5 w-5"/>
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <Button
                            type="submit"
                            className="w-full bg-[#4ADE80] hover:bg-[#4ADE80]/90 text-black font-medium py-2.5"
                        >
                            Log in
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <span className="text-gray-400">
                            Heb je nog geen account?{" "}
                        </span>
                        <Link
                            href="/registration"
                            className="text-[#4ADE80] hover:underline"
                        >
                            Registreer je
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden md:block md:w-1/2 bg-gray-200">
                <div className="h-full w-full flex items-center justify-center">
                <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Placeholder Image"
                        width={300}
                        height={300}
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
