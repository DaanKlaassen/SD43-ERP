'use client';

import Image from "next/image";
import Link from "next/link";
import {Eye, EyeOff} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import doCredentialRegister from "@/app/actions/doCredentialRegister";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function RegistrationForm() {
    const router = useRouter();
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const blockedWords = ["swear1", "swear2", "swear3"]; // Replace with actual swear words

    const validateName = (name: string) => {
        for (const word of blockedWords) {
            if (name.toLowerCase().includes(word)) {
                return "Naam bevat ongepaste taal.";
            }
        }
        return null;
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? null : "Ongeldig e-mailadres.";
    };

    const validatePassword = (password: string) => {
        if (password.length < 10) {
            return "Wachtwoord moet minimaal 10 tekens bevatten.";
        }
        if (password.length > 255) {
            return "Wachtwoord mag maximaal 255 tekens bevatten.";
        }
        return null;
    };

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setNameError(null);
        setEmailError(null);
        setPasswordError(null);

        const formdata = new FormData(event.currentTarget);
        const name = formdata.get("name") as string;
        const email = formdata.get("email") as string;
        const password = formdata.get("password") as string;

        // Validate inputs
        const nameValidation = validateName(name);
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);

        if (nameValidation || emailValidation || passwordValidation) {
            setNameError(nameValidation);
            setEmailError(emailValidation);
            setPasswordError(passwordValidation);
            return;
        }

        try {
            const response = await doCredentialRegister(formdata);
            if (!response?.success) {
                console.error(response?.error ?? "Er is een onbekende fout opgetreden.");
            } else {
                router.push(DEFAULT_LOGIN_REDIRECT);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#081929]">
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="mb-8 pointer-events-none">
                        <Image
                            src="/Logo-erp.svg"
                            alt="Zeropoint Logo"
                            width={150}
                            height={32}
                            className="text-white"
                        />
                    </div>

                    <h1 className="text-2xl font-semibold text-white mb-8">
                        Registreer bij Zeropoint
                    </h1>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm text-gray-300">
                                Naam
                            </label>
                            <Input
                                name="name"
                                id="name"
                                type="text"
                                required
                                className="bg-[#0B1218] border-gray-700 text-white focus:border-[#4ADE80] focus:ring-[#4ADE80]"
                            />
                            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm text-gray-300">
                                E-mail
                            </label>
                            <Input
                                name="email"
                                id="email"
                                type="email"
                                required
                                className="bg-[#0B1218] border-gray-700 text-white focus:border-[#4ADE80] focus:ring-[#4ADE80]"
                            />
                            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm text-gray-300">
                                Wachtwoord
                            </label>
                            <div className="relative">
                                <Input
                                    name="password"
                                    id="password"
                                    type={showPassword ? "text" : "password"} // Toggle between text and password
                                    required
                                    className="bg-[#0B1218] border-gray-700 text-white focus:border-[#4ADE80] focus:ring-[#4ADE80] pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5"/>
                                    ) : (
                                        <Eye className="h-5 w-5"/>
                                    )}
                                </button>
                            </div>
                            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#4ADE80] hover:bg-[#4ADE80]/90 text-black font-medium py-2.5"
                        >
                            Registreer
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <span className="text-gray-400">Heb je al een account? </span>
                        <Link href="/login" className="text-[#4ADE80] hover:underline">
                            Log in
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
