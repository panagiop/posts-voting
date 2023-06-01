import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useLikePostMutation() {
    const queryClient = useQueryClient();

    async function likePost(postId: number) {
        try {
            const response = await fetch(`/api/posts/${postId}/like`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            const result = await response.json();
            if (response.status === 201) {
                // eslint-disable-next-line no-alert
                alert(result.message);
                return null;
            }
            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    const { mutate } = useMutation({
        mutationFn: (postId: number) => likePost(postId),
        onSuccess: () => queryClient.invalidateQueries(['posts'])
    });

    return { mutate };
}
