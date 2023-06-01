import { Post } from '@prisma/client';
import { PostModel, SessionModel } from '@/types';
import { prisma } from './prisma';

export async function getPosts() {
    try {
        const posts = (await prisma.post.findMany({
            include: {
                votes: true,
                author: true
            }
        })) as PostModel[];

        // eslint-disable-next-line no-restricted-syntax
        for (const p of posts) {
            // eslint-disable-next-line no-await-in-loop
            p.numberOfLikes = p.votes.filter((vote) => vote.value === 1).length;
            // eslint-disable-next-line no-await-in-loop
            p.numberOfDislikes = p.votes.filter(
                (vote) => vote.value === -1
            ).length;
        }
        return { posts };
    } catch (error) {
        return { error };
    }
}

export async function createPost(post: Post, session: SessionModel) {
    try {
        const { title, content } = post;

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                author: {
                    connect: {
                        id: session?.user?.id
                    }
                }
            }
        });
        return { newPost };
    } catch (error) {
        return { error };
    }
}
