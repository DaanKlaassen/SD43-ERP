import { NextResponse } from 'next/server';
import { getAllUsers } from '../../actions/fetchUsers';

export async function GET() {
    try {
        const users = await getAllUsers();

        if (!users || users.length === 0) {
            return NextResponse.json(
                { success: false, message: 'No users found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: users });
    } catch (error: unknown) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}