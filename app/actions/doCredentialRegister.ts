"use server";

import {hash} from "@/app/actions/pw-hash";
import {insertUser} from "@/prisma/prismaClient";
import {signIn} from "@/auth";

const doCredentialRegister = async (formData: FormData) => {
    try {
        if (!formData) {
            throw new Error('No form data provided');
        }

        const password = formData.get('password');
        const email = formData.get('email');
        const name = formData.get('name');

        if (!password || !email || !name) {
            throw new Error('Missing required fields');
        }

        const hashedPassword = await hash(password as string);
        const response = await insertUser(email as string, name as string, hashedPassword);
        if (response) {
            const authResponse = await signIn("credentials", {
                email: formData.get('email'),
                password: formData.get('password'),
                redirect: false
            });
            return {
                success: true, data: authResponse
            }
        }
    } catch
        (error) {
        return {success: false, error: error};
    }
};

export default doCredentialRegister;