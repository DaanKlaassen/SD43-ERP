import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function insertUser(email: string, name: string, password: string) {
    try {
        return await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: password,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
}

export async function getUserByEmail(email: string) {
    try {
        return await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
}

export const db = prisma;

export async function getAllUsers() {
    try {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
}

export async function insertProject(data: {
    projectName: string;
    assignedTo: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: string;
}) {
    try {
        return await prisma.project.create({
            data: {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
}

// The getAllProjects function is added here
export async function getAllProjects() {
    try {
        return await prisma.project.findMany({
            select: {
                id: true,
                projectName: true,
                description: true,
                startDate: true,
                endDate: true,
                status: true,
            },
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}
