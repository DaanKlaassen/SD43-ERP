"use server";

import { getAllProjects } from "@/prisma/prismaClient";

const projectOverzichtBck = async () => {
    try {
        // Fetch all projects from the database
        const projects = await getAllProjects();

        if (!projects || projects.length === 0) {
            throw new Error("No projects found");
        }

        return { success: true, data: projects };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        } else {
            return { success: false, error: "An unknown error occurred" };
        }
    }
};

export default projectOverzichtBck;
