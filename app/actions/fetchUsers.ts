"use server";

import {getAllUsers} from "@/prisma/prismaClient";

const fetchUsers = async () => {
    try {
        const users = await getAllUsers()
        const filteredUsers = users?.filter(user => user.name !== "GILDE{DATABASE}")
        return {success: true, data: filteredUsers}
    } catch (error) {
        return {success: false, error: error};
    }
}

export default fetchUsers;