import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

type FormValues = {
    name: string;
    email: string;
    password: string;
};

export default function useRegisterUserMutation() {
    async function registerUser(formValues: FormValues) {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(formValues),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            if (result.status === 'error') {
                throw new Error(result.message);
            }
            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    const {
        mutate,
        isLoading,
        error
    }: { mutate: any; isLoading: boolean; error: any } = useMutation({
        mutationFn: (formValues: FormValues) => registerUser(formValues),
        onSuccess: () => signIn(undefined, { callbackUrl: '/posts' })
    });

    return { mutate, isLoading, error };
}
