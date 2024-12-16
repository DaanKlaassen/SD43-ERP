"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from 'lucide-react'

interface Project {
    title: string
    description: string
    date: string
    status: "voltooid" | "in-onderhoud"
}

const projects: Project[] = [
    {
        title: "Project",
        description: "Lorem ipsum dolor sit amet. Eos nobis enim ut nostrum",
        date: "21 november 2024",
        status: "voltooid"
    },
    {
        title: "Project",
        description: "Lorem ipsum dolor sit amet. Eos nobis enim ut nostrum",
        date: "21 november 2024",
        status: "voltooid"
    },
    {
        title: "Project",
        description: "Lorem ipsum dolor sit amet. Eos nobis enim ut nostrum",
        date: "21 november 2024",
        status: "in-onderhoud"
    },
    {
        title: "Project",
        description: "Lorem ipsum dolor sit amet. Eos nobis enim ut nostrum",
        date: "21 november 2024",
        status: "in-onderhoud"
    }
]

export default function ProjectOverzicht() {
    const [search, setSearch] = useState("")

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-[#0A192F] text-white">
            <header className="border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img src="/placeholder.svg?height=32&width=120" alt="ZeroPoint" className="h-8" />
                            <nav className="ml-10 space-x-4">
                                <Button variant="ghost">Urenregistratie</Button>
                                <Button variant="ghost">Projecten</Button>
                                <Button variant="ghost">Werknemers</Button>
                            </nav>
                        </div>
                        <Button variant="secondary">Sign out</Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <Input
                        type="search"
                        placeholder="Zoek Projecten..."
                        className="max-w-md bg-[#0B1218] border-gray-800"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.map((project, index) => (
                        <Card key={index} className="bg-[#0B1218] border-gray-800">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
                                <Badge
                                    variant={project.status === "voltooid" ? "default" : "secondary"}
                                    className="capitalize"
                                >
                                    {project.status === "voltooid" ? "Voltooid" : "In onderhoud"}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400 mb-4">{project.description}</p>
                                <div className="flex items-center text-sm text-gray-400">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {project.date}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}

