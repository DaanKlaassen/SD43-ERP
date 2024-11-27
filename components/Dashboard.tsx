'use client';

import { Navbar } from '@/components/Navbar';

interface DashboardProps {
    children: React.ReactNode;
}

export function Dashboard({ children }: DashboardProps) {
    return (
        <div className="min-h-screen bg-[#0A192F]">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}