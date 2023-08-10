import { useQuery } from 'react-query';
import postService from '@/services/postService';

export function usePosts() {
  return useQuery(['posts'], postService.getPosts);
}

export function usePost(id: string) {
  return useQuery(['posts', id], () => postService.getPost(id));
}
