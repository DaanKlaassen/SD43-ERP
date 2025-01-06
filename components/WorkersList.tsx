'use client';

import { useEffect, useState } from 'react';

type User = {
    id: number;
    name: string;
    email: string;
};

export default function WorkersList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/Users');
                const data = await response.json();

                if (data.success) {
                    setUsers(data.data);
                } else {
                    console.error('Error fetching users:', data.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading workers...</div>;
    }

    if (users.length === 0) {
        return <div>No workers found.</div>;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <h1 className="text-2xl font-semibold">Workers List</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {users.map((user) => (
                        <div key={user.id} className="bg-slate-800 p-4 rounded-lg">
                            <h2 className="text-xl font-bold">{user.name}</h2>
                            <p>Email: {user.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
