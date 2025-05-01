import { create } from 'zustand';
import { Post } from '../../../entities/post/model';
import { User } from '../../../entities/user/model';
import { Comment } from '../../../entities/comment/model';



/**
 * 모달 상태 관리 스토어
 * - 모달 표시 여부 및 관련 데이터 관리
 * - 모든 모달 상태를 중앙화하여 관리
 */
interface ModalState {
  // 게시물 관련 모달
  isPostAddDialogOpen: boolean;
  isPostEditDialogOpen: boolean;
  isPostDetailDialogOpen: boolean;

  // 댓글 관련 모달
  isCommentAddDialogOpen: boolean;
  isCommentEditDialogOpen: boolean;

  // 사용자 관련 모달
  isUserDetailDialogOpen: boolean;

  // 선택된 항목들
  selectedPost: Post | null;
  selectedComment: Comment | null;
  selectedUser: User | null;

  // 모달 열기/닫기 액션
  openPostAddDialog: () => void;
  closePostAddDialog: () => void;

  openPostEditDialog: (post: Post) => void;
  closePostEditDialog: () => void;

  openPostDetailDialog: (post: Post) => void;
  closePostDetailDialog: () => void;

  openCommentAddDialog: (postId: number) => void;
  closeCommentAddDialog: () => void;

  openCommentEditDialog: (comment: Comment) => void;
  closeCommentEditDialog: () => void;

  openUserDetailDialog: (user: User) => void;
  closeUserDetailDialog: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isPostAddDialogOpen: false,
  isPostEditDialogOpen: false,
  isPostDetailDialogOpen: false,
  isCommentAddDialogOpen: false,
  isCommentEditDialogOpen: false,
  isUserDetailDialogOpen: false,

  selectedPost: null,
  selectedComment: null,
  selectedUser: null,

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

  openCommentAddDialog: (postId) => set({
    isCommentAddDialogOpen: true,
    selectedPost: { id: postId } as Post
  }),
  closeCommentAddDialog: () => set({
    isCommentAddDialogOpen: false
  }),

  openCommentEditDialog: (comment) => set({
    isCommentEditDialogOpen: true,
    selectedComment: comment
  }),
  closeCommentEditDialog: () => set({
    isCommentEditDialogOpen: false
  }),

  openUserDetailDialog: (user) => set({
    isUserDetailDialogOpen: true,
    selectedUser: user
  }),
  closeUserDetailDialog: () => set({
    isUserDetailDialogOpen: false
  }),
}));