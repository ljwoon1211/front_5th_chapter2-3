import { create } from 'zustand';
import { Post } from '../../../entities/post/model';

interface PostModalState {
  isPostAddDialogOpen: boolean;
  isPostEditDialogOpen: boolean;
  isPostDetailDialogOpen: boolean;
  selectedPost: Post | null;

  openPostAddDialog: () => void;
  closePostAddDialog: () => void;

  openPostEditDialog: (post: Post) => void;
  closePostEditDialog: () => void;

  openPostDetailDialog: (post: Post) => void;
  closePostDetailDialog: () => void;
}

export const usePostModalStore = create<PostModalState>((set) => ({
  isPostAddDialogOpen: false,
  isPostEditDialogOpen: false,
  isPostDetailDialogOpen: false,
  selectedPost: null,

  openPostAddDialog: () => set({ isPostAddDialogOpen: true }),
  closePostAddDialog: () => set({ isPostAddDialogOpen: false }),

  openPostEditDialog: (post) => set({
    isPostEditDialogOpen: true,
    selectedPost: post
  }),
  closePostEditDialog: () => set({
    isPostEditDialogOpen: false
  }),

  openPostDetailDialog: (post) => set({
    isPostDetailDialogOpen: true,
    selectedPost: post
  }),
  closePostDetailDialog: () => set({
    isPostDetailDialogOpen: false
  }),
}));