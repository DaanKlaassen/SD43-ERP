"use client";

// import { SearchBar } from "@/components/search-bar";
import { ProjectCard } from "@/components/project-card";

// Sample data
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
];

export default function ProjectView() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <h1 className="text-2xl font-semibold">Project Overzicht</h1>
                {/*<SearchBar />*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
}