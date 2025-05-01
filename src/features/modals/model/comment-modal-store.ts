import { create } from 'zustand';
import { Post } from '../../../entities/post/model';
import { Comment } from '../../../entities/comment/model';

interface CommentModalState {
  isCommentAddDialogOpen: boolean;
  isCommentEditDialogOpen: boolean;
  selectedPost: Post | null;
  selectedComment: Comment | null;

  openCommentAddDialog: (post: Post) => void;
  closeCommentAddDialog: () => void;

  openCommentEditDialog: (comment: Comment) => void;
  closeCommentEditDialog: () => void;
}

export const useCommentModalStore = create<CommentModalState>((set) => ({
  isCommentAddDialogOpen: false,
  isCommentEditDialogOpen: false,
  selectedPost: null,
  selectedComment: null,

  openCommentAddDialog: (post: Post) => set({
    isCommentAddDialogOpen: true,
    selectedPost: post
  }),
  closeCommentAddDialog: () => set({
    isCommentAddDialogOpen: false
  }),

  openCommentEditDialog: (comment: Comment) => set({
    isCommentEditDialogOpen: true,
    selectedComment: comment
  }),
  closeCommentEditDialog: () => set({
    isCommentEditDialogOpen: false
  }),
}));