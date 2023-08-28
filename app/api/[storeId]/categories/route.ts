import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(
    request: Request,
    { params }: { params: { storeId: string}}
){
    try {
        const { userId } = auth();
        const body = await request.json()
        const { name, billboardId } = body;

        if(!userId){
            return new NextResponse('Unathenticated', { status: 401 });
        }

        if(!name){
            return new NextResponse('Name is required', { status: 400 });
        }

        if(!billboardId){
            return new NextResponse('Billboard ID is required', { status: 400 });
        }

        if(!params.storeId){
            return new NextResponse('Store id is required', { status: 400 });
        }

        const storeUserId = await prismadb.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        });

        if(!storeUserId){
            return new NextResponse('Unauthorized', { status: 403 });
        }

        const category = await prismadb.category.create({
            data:{
                name,
                billboardId,
                storeId: params.storeId
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORIES_PSOT]', error);
        return new NextResponse('internal error', { status: 500 });
    }
}

export async function GET(
    request: Request,
    { params }: { params: { storeId: string}}
){
    try {

        if(!params.storeId){
            return new NextResponse('Store id is required', { status: 400 });
        }

        const categories = await prismadb.category.findMany({
            where:{
                storeId: params.storeId,
            },

        });

        return NextResponse.json(categories);
    } catch (error) {
        console.log('[CATEGORIES_DELETE]', error);
        return new NextResponse('internal error', { status: 500 });
    }
}