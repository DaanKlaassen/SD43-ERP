"use server";

import { insertProject } from "@/prisma/prismaClient";

const projectFormSubmit = async (formData: FormData) => {
    try {
        if (!formData) {
            throw new Error('No form data provided');
        }

        console.log(formData);

        const projectName = formData.get('projectName');
        const assignedTo = formData.get('assignedTo');
        const description = formData.get('description');
        const startDate = formData.get('startDate');
        const endDate = formData.get('endDate');
        const status = formData.get('status');

        if (!projectName || !assignedTo || !description || !startDate || !endDate || !status) {
            throw new Error('Missing required fields');
        }

        const response = await insertProject({
            projectName: projectName as string,
            assignedTo: assignedTo as string,
            description: description as string,
            startDate: new Date(startDate as string),
            endDate: new Date(endDate as string),
            status: status as string,
        });

        return { success: true, data: response };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        } else {
            return { success: false, error: 'An unknown error occurred' };
        }
    }
};

export default projectFormSubmit;
