import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function insertUser(email: string, name: string, password: string) {
    try {
        return await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: password,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export async function getUserByEmail(email: string) {
    try {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const db = prisma

export async function getAllUsers() {
    try {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            }
        })
    } catch (error) {
        console.error(error)
    }
}