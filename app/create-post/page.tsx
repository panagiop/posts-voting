import React from 'react';
import CreatePostForm from '@/components/CreatePostForm';

export default async function CreatePostPage() {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="bg-white px-10 py-10 min-w-[500px]">
                <CreatePostForm />
            </div>
        </div>
    );
}
