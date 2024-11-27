"use client";

import {Dashboard} from '@/components/Dashboard';
import {useEffect, useState} from 'react';
import fetchUsers from '@/app/actions/fetchUsers';

interface User {
    id: string;
    email: string;
    name: string | null;
}

export default function Home() {
    const [teamMembers, setTeamMembers] = useState<User[] | undefined>(undefined);

    useEffect(() => {
        async function fetchTeamMembers() {
            fetchUsers().then((users) => {
                setTeamMembers(users.data);
            });
        }


        fetchTeamMembers()
    }, []);
    console.log("GILDE{WEBSITE}")
    return (
        <Dashboard>
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Dashboard cards can be added here */}
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-xl font-semibold text-white mb-4">Recent Projects</h2>
                        <div className="space-y-3">
                            <p className="text-gray-300">No recent projects</p>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-xl font-semibold text-white mb-4">Time Entries</h2>
                        <div className="space-y-3">
                            <p className="text-gray-300">No recent time entries</p>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-xl font-semibold text-white mb-4">Team Members</h2>
                        <div className="space-y-3">
                            {teamMembers ? (
                                <>
                                    {teamMembers?.map((user: User) => (
                                        <div key={user.id} className="flex items-center justify-between">
                                            <p className="text-gray-300">{user.name}</p>
                                            <p className="text-gray-300">{user.email}</p>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <p className="text-gray-300">No team members</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}