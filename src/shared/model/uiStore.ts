// src/shared/model/uiStore.ts
import { create } from 'zustand';


interface UIStore {
  // 모달 상태
  isPostDetailOpen: boolean;
  isEditDialogOpen: boolean;
  isUserModalOpen: boolean;
  userModalData: any | null;

  // 모달 액션
  openPostDetail: (post: Post) => void;
  closePostDetail: () => void;
  openEditDialog: () => void;
  closeEditDialog: () => void;
  openUserModal: (userData: any) => void;
  closeUserModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // 초기 상태
  isPostDetailOpen: false,
  isEditDialogOpen: false,
  isUserModalOpen: false,
  userModalData: null,

  // 액션
  openPostDetail: (post) => set({ isPostDetailOpen: true }),
  closePostDetail: () => set({ isPostDetailOpen: false }),
  openEditDialog: () => set({ isEditDialogOpen: true }),
  closeEditDialog: () => set({ isEditDialogOpen: false }),
  openUserModal: (userData) => set({ isUserModalOpen: true, userModalData: userData }),
  closeUserModal: () => set({ isUserModalOpen: false, userModalData: null }),
}));