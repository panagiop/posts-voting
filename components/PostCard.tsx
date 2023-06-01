'use client';

import React, { useMemo } from 'react';

import { useSession } from 'next-auth/react';
import { PostModel, SessionModel } from '@/types';
import useLikePostMutation from '@/api-calls/useLikePostMutation';
import useDislikePostMutation from '@/api-calls/useDislikePostMutation';

export default function PostCard({ post }: { post: PostModel }) {
    const { mutate: likeMutate } = useLikePostMutation();
    const { mutate: dislikeMutate } = useDislikePostMutation();
    const { data: session } = useSession();

    const isPostAlreadyLiked = useMemo(
        () =>
            post.votes.filter(
                (vote) =>
                    vote.userId === (session as SessionModel)?.user?.id &&
                    vote.value === 1
            ).length > 0,
        [post, session]
    );

    const isPostAlreadyDisliked = useMemo(
        () =>
            post.votes.filter(
                (vote) =>
                    vote.userId === (session as SessionModel)?.user?.id &&
                    vote.value === -1
            ).length > 0,
        [post, session]
    );

    return (
        <div className="rounded overflow-hidden border border-gray-200 w-full mx-6 my-5">
            <div className="px-6 py-6">
                <p className="font-bold text-xl mb-2">{post.title}</p>
                <i>Posted by: {post.author.name}</i>
                <p className="text-gray-700 text-base">{post.content}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button
                    disabled={isPostAlreadyLiked}
                    type="button"
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:enabled:bg-blue-200 disabled:opacity-40"
                    onClick={() => likeMutate(post.id)}
                >
                    Like
                </button>
                <span className="inline-block mr-2">{post.numberOfLikes}</span>
                <button
                    disabled={isPostAlreadyDisliked}
                    type="button"
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:enabled:bg-blue-200 disabled:opacity-40"
                    onClick={() => dislikeMutate(post.id)}
                >
                    Dislike
                </button>
                <span className="inline-block mr-2">
                    {post.numberOfDislikes || 0}
                </span>
            </div>
        </div>
    );
}
