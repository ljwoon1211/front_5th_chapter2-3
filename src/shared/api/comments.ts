import { api } from './base';
import {
  Comment,
  CommentsResponse,
  NewComment,
  EditableComment
} from '../../entities/comment/model/types';


export const fetchCommentsByPostId = async (
  postId: number
): Promise<CommentsResponse> => {
  return api.get<CommentsResponse>(`/comments/post/${postId}`);
};

export const addComment = async (
  newComment: NewComment
): Promise<Comment> => {
  return api.post<Comment>('/comments/add', newComment);
};

export const updateComment = async (
  comment: EditableComment
): Promise<Comment> => {
  return api.put<Comment>(`/comments/${comment.id}`, { body: comment.body });
};

export const deleteComment = async (
  id: number
): Promise<void> => {
  return api.delete<void>(`/comments/${id}`);
};

// 댓글 좋아요
export const likeComment = async (
  id: number,
  currentLikes: number
): Promise<Comment> => {
  return api.patch<Comment>(`/comments/${id}`, { likes: currentLikes + 1 });
};