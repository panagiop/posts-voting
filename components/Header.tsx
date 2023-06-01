'use client';

import React from 'react';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();

    const { data: session } = useSession();
    return (
        <nav className="flex text-white border-gray-200 dark:bg-gray-800 w-full px-4 py-4 items-center justify-center">
            <ul className="flex w-full justify-between">
                <li className="mr-6">
                    <span>Prisma-NextAuth demo</span>
                    {session?.user?.email && (
                        <button
                            type="button"
                            className="ml-6 bg-transparent bg-blue-500 hover:text-blue-400 font-semibold text-white py-2 px-4 border hover:border-white rounded"
                            onClick={() => router.push('/create-post')}
                        >
                            + Add post
                        </button>
                    )}
                </li>
                <li className="mr-6">
                    {session?.user?.email && (
                        <>
                            <span className="mr-4">
                                Hi {session.user.name}!
                            </span>
                            <button
                                type="button"
                                className="bg-transparent bg-blue-500 hover:text-blue-400 font-semibold text-white py-2 px-4 border hover:border-white rounded"
                                onClick={() => signOut()}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </li>
            </ul>
        </nav>
    );
}
