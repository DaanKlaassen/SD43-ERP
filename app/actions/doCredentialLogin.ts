"use server";

import {signIn} from "@/auth";

const doCredentialLogin = async (formData: FormData) => {
    try {
        if (!formData) {
            throw new Error('No form data provided');
        }
        const response = await signIn("credentials", {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        });
        if (response.error) {
            console.error('Authentication error:', response.error);
            return {success: false, error: response.error};
        } else {
            return {success: true, data: response};
        }
    } catch (error) {
        return {success: false, error: error};
    }
};

export default doCredentialLogin;