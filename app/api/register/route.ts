import { createHash } from 'crypto';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = createHash('sha256')
            .update(password)
            .digest('hex');

        const foundUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (foundUser) {
            return NextResponse.json(
                {
                    status: 'error',
                    message: 'User already exists'
                },
                { status: 500 }
            );
        }

        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: hashedPassword
            }
        });

        return NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                status: 'error',
                message: error.message
            },
            { status: 500 }
        );
    }
}
