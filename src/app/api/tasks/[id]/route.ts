import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    // Esperar a que se resuelvan los parámetros
    const resolvedParams = await params;
    
    const task = await prisma.task.findFirst({
        where: {
            id: Number(resolvedParams.id)
        },
    })
    return NextResponse.json(task)
}

export async function PUT(request : Request, {params} : { params: { id: string } }) {
    // Esperar a que se resuelvan los parámetros
    const resolvedParams = await params;
    
    const data = await request.json()
    const taskUpdated = await prisma.task.update({
        where: {
            id: Number(resolvedParams.id),
        },
        data: data
    });

    return NextResponse.json(taskUpdated)
}

export async function DELETE(request : Request, {params} : { params: { id: string } }) {
    // Esperar a que se resuelvan los parámetros
    const resolvedParams = await params;
    
    const task = await prisma.task.delete({
        where: {
            id: Number(resolvedParams.id)
        },})
    return NextResponse.json(task)
}