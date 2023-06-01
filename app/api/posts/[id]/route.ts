import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// eslint-disable-next-line import/prefer-default-export
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const post = await prisma.post.findUnique({
        where: {
            id: +(params?.id || 0)
        }
    });

    if (!post) {
        return NextResponse.json(
            {
                message: `No post found with id: ${params?.id}`
            },
            { status: 404 }
        );
    }

    return NextResponse.json(
        {
            message: {
                postId: post.id,
                title: post.title,
                content: post.content,
                numberOfLikes: await prisma.postVote.count({
                    where: {
                        postId: post.id,
                        value: { equals: 1 }
                    }
                }),
                numberOfDisLikes: await prisma.postVote.count({
                    where: {
                        postId: post.id,
                        value: { equals: -1 }
                    }
                })
            }
        },
        { status: 200 }
    );
}
