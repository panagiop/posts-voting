'use client';

import React, { useEffect, useState } from 'react';

import { PostModel } from '@/types';
import usePosts from '@/api-calls/usePostsQuery';
import PostCard from './PostCard';
import Filters from './Filters';

export default function PostsList() {
    const { data, isLoading } = usePosts();
    const [sortedPosts, setSortedPosts] = useState<PostModel[]>(data?.posts);

    useEffect(() => {
        setSortedPosts(data?.posts);
    }, [data?.posts]);

    if (isLoading) {
        return (
            <div className="flex justify-center w-screen px-5 py-5">
                Loading...
            </div>
        );
    }

    const sortBy = (prop: string) => {
        let [sortProp, desc] = prop?.split(':') ?? [];

        setSortedPosts(
            [...data.posts].sort((a, b) =>
                desc
                    ? b[sortProp]
                          ?.toString()
                          .localeCompare(a[sortProp].toString())
                    : a[sortProp]
                          ?.toString()
                          .localeCompare(b[sortProp].toString())
            )
        );
    };

    return (
        <div className="flex flex-wrap">
            {sortedPosts?.length > 0 && !isLoading && (
                <Filters sortBy={sortBy} />
            )}
            {sortedPosts?.length > 0 &&
                !isLoading &&
                sortedPosts.map((post: PostModel) => (
                    <PostCard key={post.id} post={post} />
                ))}
        </div>
    );
}
