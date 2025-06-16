import type { Post } from "../types/post";

export const actions = {
    fetchPosts: async ({ request }) => {
        const formData = await request.formData();

        const limit = formData.get('limit');
        const offset =formData.get('offset');

        if(!limit || !offset) {
            return { success: false, error: 'Limit and offset are required' };
        }

        if( isNaN(Number(limit)) || isNaN(Number(offset))) {
            return { success: false, error: 'Limit and offset must be numbers' };
        }

        try {
            const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${offset}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return { success: false, error: 'Failed to make request' };
            }

            // Parse the response
            const data = await response.json();

            // Cast data as Post[]
            const posts = data.posts as Post[];

            // Validate the posts array
            if (!Array.isArray(posts)) {
                return { success: false, error: 'Invalid data format' };
            }

            return { success: true, posts: posts };

        } catch (error) {
            return { success: false };
        }
    }
}