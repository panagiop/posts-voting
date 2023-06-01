import { getServerSession } from 'next-auth';
import React from 'react';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (session?.user?.email) {
        redirect('/posts');
    }
    return (
        <div className="flex w-full justify-center py-10">
            <h3>welcome to dashboard page</h3>
        </div>
    );
}
