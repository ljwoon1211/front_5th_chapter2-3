import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditablePost, NewPost, Post, PostsResponse } from '../../../entities/post/model';
import { addPost, deletePost, updatePost } from '../../../entities/post/api/posts';

export const useAddPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPost: NewPost) => addPost(newPost),
    onSuccess: (newPostData) => {
      queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData: PostsResponse) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          posts: [newPostData, ...(oldData.posts || [])],
          total: (oldData.total || 0) + 1,
        };
      });

    },
  });
};


export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: EditablePost) => updatePost(post),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['post', updatedPost.id], updatedPost);

      queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData: PostsResponse) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          posts: oldData.posts.map((post: Post) =>
            post.id === updatedPost.id ? { ...post, ...updatedPost } : post
          ),
        };
      });

    },
  });
};


export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData: PostsResponse) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          posts: oldData.posts.filter((post: Post) => post.id !== deletedId),
          total: Math.max(0, (oldData.total || 0) - 1),
        };
      });
    },
  });
};