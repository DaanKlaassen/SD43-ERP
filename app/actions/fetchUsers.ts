"use server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllUsers() {
    try {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}
