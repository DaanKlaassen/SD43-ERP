"use server"


import { getAllUsers } from "@/prisma/prismaClient";

const usersListBck = async () => {
    try {
        // Fetch all users from the database
        const users = await getAllUsers();

        if (!users || users.length === 0) {
            throw new Error("No users found");
        }

        return { success: true, data: users };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        } else {
            return { success: false, error: "An unknown error occurred" };
        }
    }
};

export default usersListBck;
