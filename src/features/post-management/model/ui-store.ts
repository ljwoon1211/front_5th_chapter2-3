import { create } from "zustand";
import { Post } from "../../../entities/post/model";

interface PostUIState {
  showAddDialog: boolean;
  showEditDialog: boolean;
  showPostDetailDialog: boolean;

  selectedPost: Post | null;

  setShowAddDialog: (show: boolean) => void;
  setShowEditDialog: (show: boolean) => void;
  setShowPostDetailDialog: (show: boolean) => void;
  setSelectedPost: (post: Post | null) => void;
}
export const usePostUIStore = create<PostUIState>((set) => ({
  // 초기 상태
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
  selectedPost: null,

  // 액션 정의 (set 함수 형태로 변경)
  setShowAddDialog: (show) => set({ showAddDialog: show }),
  setShowEditDialog: (show) => set({ showEditDialog: show }),
  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
  setSelectedPost: (post) => set({ selectedPost: post })
}));