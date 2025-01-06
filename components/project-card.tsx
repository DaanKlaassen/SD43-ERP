export const ProjectCard = ({ project }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="text-gray-500">{project.description}</p>
        </div>
    )
}