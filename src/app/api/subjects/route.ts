import { NextResponse } from "next/server";
import { requireCurrentUser } from "@/services/user.service";
import { getUserSubjects, getSubjectTasks, getSubjectAssignments, getSubjectExams } from "@/services/subjects.service";

export async function GET() {
    try {
        //get user
        const user = await requireCurrentUser();

        const [subjects, assignments, tasks, exams] = await Promise.all([
            getUserSubjects(user.userId),
            getSubjectAssignments(user.userId),
            getSubjectTasks(user.userId),
            getSubjectExams(user.userId),
        ])

        return NextResponse.json({
            subjects, assignments, tasks, exams
        })
    } catch (error) {
        console.error('Failed to fetch subjects data: ' ,error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
} 