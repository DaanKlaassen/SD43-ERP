import { NextResponse } from 'next/server';
import { getAllProjects } from '@/prisma/prismaClient';  // Adjust the path to prismaClient if necessary

export async function GET() {
    try {
        // Use Prisma to fetch all projects
        const projects = await getAllProjects();
        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch projects' }, { status: 500 });
    }
}
