import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(
    request: Request,
    { params }: { params: { storeId: string, sizeId: string}}
){
    try {
        const { userId } = auth();
        const body = await request.json()
        const { name, value } = body;

        if(!userId){
            return new NextResponse('Unathenticated', { status: 401 });
        }

        if(!name){
            return new NextResponse('Name is required', { status: 400 });
        }

        if(!value){
            return new NextResponse('Value is required', { status: 400 });
        }

        if(!params.sizeId){
            return new NextResponse('Size id is required', { status: 400 });
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

        const size = await prismadb.size.updateMany({
            where:{
                id: params.sizeId,
            },
            data:{
                name,
                value
            }
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZE_PATCH]', error);
        return new NextResponse('internal error', { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { storeId: string, sizeId: string }}
){
    try {
        const { userId } = auth();

        if(!userId){
            return new NextResponse('Unathenticated', { status: 401 });
        }

        if(!params.sizeId){
            return new NextResponse('Size id is required', { status: 400 });
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

        const size = await prismadb.size.deleteMany({
            where:{
                id: params.sizeId,
            },

        });

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZE_DELETE]', error);
        return new NextResponse('internal error', { status: 500 });
    }
}

export async function GET(
    request: Request,
    { params }: { params: { sizeId: string }}
){
    try {

        if(!params.sizeId){
            return new NextResponse('Size id is required', { status: 400 });
        }

        const size = await prismadb.size.findUnique({
            where:{
                id: params.sizeId,
            },

        });

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZE_GET]', error);
        return new NextResponse('internal error', { status: 500 });
    }
}