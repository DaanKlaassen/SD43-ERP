"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Updated import
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import projectFormBck from "@/app/actions/projectFormBck";

export default function ProjectRegistration() {
    const [formData, setFormData] = useState({
        projectName: '',
        assignedTo: '',
        description: '',
        startDate: '',
        endDate: '',
        status: ''
    });
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const router = useRouter(); // Updated usage

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prevState => ({ ...prevState, status: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('projectName', formData.projectName);
        data.append('assignedTo', formData.assignedTo);
        data.append('description', formData.description);
        data.append('startDate', startDate ? startDate.toString() : '');
        data.append('endDate', endDate ? endDate.toString() : '');
        data.append('status', formData.status);

        const response = await projectFormBck(data);

        if (response) {
            router.push('/projectview'); // Updated redirect
        } else {
            console.error('Failed to submit form');
        }
    };

    return (
        <div className="min-h-screen bg-[#0A192F] text-white">

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <div className="space-y-2 mb-8 text-center">
                    <h1 className="text-3xl font-bold">Project Registratie</h1>
                    <p className="text-gray-400">Vul de details in om een nieuw project te registreren</p>
                </div>

                <form className="space-y-6 max-w-4xl mx-auto" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="projectName">Projectnaam</Label>
                            <Input
                                name="projectName"
                                id="projectName"
                                type="text"
                                required
                                className="bg-[#0B1218] border-gray-700 text-white focus:border-[#4ADE80] focus:ring-[#4ADE80]"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="assignedTo">Toegewezen aan:</Label>
                            <Input
                                name="assignedTo"
                                id="assignedTo"
                                type="text"
                                required
                                className="bg-[#0B1218] border-gray-700 text-white focus:border-[#4ADE80] focus:ring-[#4ADE80]"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Beschrijving</Label>
                        <Textarea
                            name="description"
                            id="description"
                            required
                            className="bg-[#0B1218] border-gray-700 text-white focus:border-[#4ADE80] focus:ring-[#4ADE80]"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label>Startdatum</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-transparent border-gray-800",
                                            !startDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                        {startDate ? format(startDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label>Einddatum</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-transparent border-gray-800",
                                            !endDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                        {endDate ? format(endDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={setEndDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select onValueChange={handleSelectChange}>
                                <SelectTrigger className="bg-transparent border-gray-800">
                                    <SelectValue placeholder="Selecteer status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="not-started">Niet begonnen</SelectItem>
                                    <SelectItem value="in-progress">Bezig</SelectItem>
                                    <SelectItem value="paused">Gepauzeerd</SelectItem>
                                    <SelectItem value="completed">Voltooid</SelectItem>
                                    <SelectItem value="cancelled">Geannuleerd</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
                        Project Registreren
                    </Button>
                </form>
            </main>
        </div>
    );
}