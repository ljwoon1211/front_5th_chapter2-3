import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, likeComment, updateComment } from '../../../shared/api/comments';
import { Comment, CommentsResponse, EditableComment, NewComment } from '../../../entities/comment/model/types';

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newComment: NewComment) => addComment(newComment),
    onSuccess: (comment) => {
      queryClient.setQueryData(['comments', comment.postId], (oldData: CommentsResponse) => {
        if (!oldData) return { comments: [comment] };

        return {
          ...oldData,
          comments: [...oldData.comments, comment],
        };
      });

      // queryClient.invalidateQueries({
      //   queryKey: ['post', comment.postId],
      // });
    },
  });
};


export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: EditableComment) => updateComment(comment),
    onSuccess: (updatedComment) => {
      queryClient.setQueryData(['comments', updatedComment.postId], (oldData: CommentsResponse) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          comments: oldData.comments.map((comment: Comment) =>
            comment.id === updatedComment.id ? { ...comment, ...updatedComment } : comment
          ),
        };
      });
    },
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number; postId: number }) => deleteComment(id),
    onSuccess: (_, variables) => {
      const { id, postId } = variables;

      // 댓글 목록 쿼리 캐시 업데이트
      queryClient.setQueryData(['comments', postId], (oldData: CommentsResponse) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          comments: oldData.comments.filter((comment: Comment) => comment.id !== id),
        };
      });

      queryClient.invalidateQueries({
        queryKey: ['post', postId],
      });
    },
  });
};


export const useLikeCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number; postId: number }) =>
      likeComment(id, likes),
    onSuccess: (updatedComment, variables) => {
      const postId = variables.postId;
      const commentId = variables.id;
      const currentLikes = variables.likes;

      queryClient.setQueryData(['comments', postId], (oldData: CommentsResponse) => {
        if (!oldData) return { comments: [updatedComment] };
        return {
          ...oldData,
          comments: oldData.comments.map((comment: Comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                likes: currentLikes + 1
              };
            }
            return comment;
          })
        };
      });
    },
  });
};