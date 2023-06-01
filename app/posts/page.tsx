import React from 'react';
import { dehydrate } from '@tanstack/react-query';
import PostsList from '@/components/PostsList';
import { getPosts } from '@/lib/posts';
import getQueryClient from '../getQueryClient';
import Hydrate from '../hydrate.client';

async function getPostData() {
    const { posts } = await getPosts();
    if (!posts) {
        throw new Error('Failed to fetch data');
    }
    return { posts };
}

export default async function PostsPage() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(['posts'], getPostData);
    const dehydratedState = dehydrate(queryClient);

    return (
        <div className="flex flex-wrap w-screen px-5 py-5">
            <Hydrate state={dehydratedState}>
                <PostsList />
            </Hydrate>
        </div>
    );
}
