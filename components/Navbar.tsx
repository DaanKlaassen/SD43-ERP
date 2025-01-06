'use client';

import {Menu} from 'lucide-react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation'; // Import useRouter for navigation
import {logout} from '@/app/actions/logout';

export function Navbar() {
    const router = useRouter(); // Use router for navigation

    const handleLogout = async () => {
        try {
            await logout(); // Call the logout function
            router.push('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <nav className="bg-[#0A192F] border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/dashboard" className="flex items-center">
                            <span className="text-white text-xl font-bold">ZEROPOINT</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/projectregistration" className="text-gray-300 hover:text-white">
                            Projectregistratie
                        </Link>
                        <Link href="/projectview" className="text-gray-300 hover:text-white">
                            Projectoverzicht
                        </Link>
                        <Link href="/workers" className="text-gray-300 hover:text-white">
                            Werknemers
                        </Link>
                        <Button variant="destructive" size="sm" onClick={handleLogout}>
                            Sign out
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6 text-gray-300"/>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
