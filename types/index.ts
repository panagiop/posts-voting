import { Post, PostVote, User } from '@prisma/client';
import { Session } from 'next-auth';

type UserId = {
    user: {
        id: number;
    };
};

export type PostModel = Post & {
    numberOfLikes: number;
    numberOfDislikes: number;
    votes: PostVote[];
    author: User;
};
export type SessionModel = Session & UserId;
