import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { SessionModel } from '@/types';
import { GET } from '../route';

// eslint-disable-next-line import/prefer-default-export
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = (await getServerSession(authOptions)) as SessionModel;

    if (!session) {
        return NextResponse.json(
            { message: 'unauthorized' },
            {
                status: 401
            }
        );
    }

    if (!params?.id) {
        return NextResponse.json(
            { message: 'No post id provided' },
            {
                status: 400
            }
        );
    }

    try {
        const response = await GET(request, { params });

        if (response.status === 404) {
            return NextResponse.json(
                {
                    message: 'No post found'
                },
                { status: 404 }
            );
        }

        const postAlreadyDisliked = await prisma.postVote.findFirst({
            where: {
                postId: +(params?.id || 0),
                userId: session?.user?.id,
                value: { equals: -1 }
            }
        });

        if (postAlreadyDisliked) {
            return NextResponse.json(
                { message: 'You have already disliked this post!' },
                { status: 201 }
            );
        }

        await prisma.postVote.upsert({
            where: {
                postId_userId: {
                    postId: +(params?.id || 0),
                    userId: session?.user?.id
                }
            },
            update: {
                value: -1
            },
            create: {
                postId: +(params?.id || 0),
                userId: session?.user?.id,
                value: -1
            }
        });

        return NextResponse.json(
            { message: 'thanks for voting!' },
            {
                status: 200
            }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            {
                status: 500
            }
        );
    }
}
