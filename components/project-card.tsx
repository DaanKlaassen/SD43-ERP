type ProjectCardProps = {
    project: {
        title: string;
        description: string;
        date: string;
        status: string;
    };
};

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="p-4 bg-slate-800 rounded-md">
            <h2 className="text-lg font-bold">{project.title}</h2>
            <p className="text-sm">{project.description}</p>
            <p className="text-sm text-slate-400">Datum: {project.date}</p>
            <p className={`text-sm font-semibold ${getStatusStyle(project.status)}`}>
                Status: {project.status}
            </p>
        </div>
    );
}


function getStatusStyle(status: string) {
    switch (status) {
        case "voltooid":
            return "text-green-500";
        case "in-onderhoud":
            return "text-yellow-500";
        default:
            return "text-red-500";
    }
}
