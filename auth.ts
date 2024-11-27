import NextAuth from "next-auth"
import authConfig from "@/auth.config";
import {PrismaAdapter} from "@auth/prisma-adapter"
import {db} from "@/prisma/prismaClient"

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig,
    trustHost : true
})