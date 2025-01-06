"use client"
import { useEffect, useState } from 'react';

type Project = {
    id: number;
    projectName: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
};

export default function ProjectView() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);  // Loading state

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Call the API route to fetch projects
                const response = await fetch('/api/projects');  // Fetch data from the API route
                const data = await response.json();

                if (data.success) {
                    setProjects(data.data);  // Set the fetched projects in state
                } else {
                    console.error('Error fetching projects:', data.message);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);  // Turn off loading state
            }
        };

        fetchProjects();  // Call the fetch function when component mounts
    }, []);

    if (loading) {
        return <div>Loading projects...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <h1 className="text-2xl font-semibold">Project Overzicht</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-slate-800 p-4 rounded-lg">
                            <h2 className="text-xl font-bold">{project.projectName}</h2>
                            <p>{project.description}</p>
                            <p>Status: {project.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
