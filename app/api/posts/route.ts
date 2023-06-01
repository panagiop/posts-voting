import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { createPost, getPosts } from '@/lib/posts';
import { authOptions } from '../auth/[...nextauth]/route';
import { SessionModel } from '@/types';

export async function GET() {
    try {
        const { posts, error } = await getPosts();
        if (error) throw new Error(error as string);

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            {
                status: 'error',
                message: error.message
            },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    const session = (await getServerSession(authOptions)) as SessionModel;

    try {
        const { newPost, error } = await createPost(await req.json(), session);
        if (error) throw new Error(error as string);

        return NextResponse.json({ newPost }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            {
                status: 'error',
                message: error.message
            },
            { status: 500 }
        );
    }
}
