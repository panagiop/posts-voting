import React from 'react';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import RegisterForm from '@/components/RegisterForm';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function RegisterPage() {
    const session = await getServerSession(authOptions);
    if (session?.user?.email) {
        redirect('/posts');
    }
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="bg-white px-10 py-10 min-w-[500px]">
                <RegisterForm />
            </div>
        </div>
    );
}
