import { Post } from '@/models/Post.ts';

const postService = {
  getPosts: async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
  },
  getPost: async (id: string): Promise<Post> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return response.json();
  },
};

export default postService;
