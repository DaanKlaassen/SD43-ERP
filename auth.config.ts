import {NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {signInSchema} from "@/lib/zod";
import {getUserByEmail} from "@/prisma/prismaClient";
import {compare} from "@/app/actions/pw-hash";
import {ZodError} from "zod";

export default {
    providers: [Credentials({
        async authorize(credentials) {
            if (credentials === null) return null
            try {
                const parsedCredentials = signInSchema.parse(credentials)
                const user = await getUserByEmail(parsedCredentials.email)
                if (user) {
                    const isMatch = await compare(parsedCredentials.password, user.password)
                    if (isMatch) {
                        return {id: user.id, name: user.name, email: user.email}
                    } else {
                        throw new Error("Password does not match")
                    }
                } else {
                    throw new Error("User not found")
                }

            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message)
                } else if (error instanceof ZodError) {
                    throw new Error(error.errors[0].message)
                } else {
                    throw new Error("An unknown error occurred")
                }
            }
        }
    })],
} satisfies NextAuthConfig