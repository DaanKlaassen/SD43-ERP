'use client';

import { ChevronDown, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {logout} from "@/app/actions/logout";

export function Navbar() {
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
                        <Link href="/hourregistration" className="text-gray-300 hover:text-white">
                            Urenregistratie
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="text-gray-300 hover:text-white">
                                    Projecten <ChevronDown className="ml-1 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem><Link href="/projectregistration" className="text-gray-300 hover:text-white">
                                    Projectregistratie
                                </Link></DropdownMenuItem>
                                <DropdownMenuItem>Project 2</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link href="/werknemers" className="text-gray-300 hover:text-white">
                            Werknemers
                        </Link>
                        <Button variant="destructive" size="sm" onClick={logout}>
                            Sign out
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6 text-gray-300" />
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}