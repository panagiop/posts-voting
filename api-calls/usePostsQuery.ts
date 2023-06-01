import { useQuery } from '@tanstack/react-query';

export default function usePosts() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () => fetch('/api/posts').then((res) => res.json())
    });
    return { data, isLoading, error };
}
