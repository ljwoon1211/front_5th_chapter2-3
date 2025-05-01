import { create } from "zustand";
import { EditablePost } from "../../../entities/post/model";



interface PostEditState {
  showEditDialog: boolean;
  editingPost: EditablePost | null;

  // 액션
  setShowEditDialog: (show: boolean) => void;
  setEditingPost: (post: EditablePost) => void;
  updateEditingPost: (postData: EditablePost) => void;

  // 유틸리티 메소드
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const usePostEditStore = create<PostEditState>((set) => ({
  showEditDialog: false,
  editingPost: null,

  setShowEditDialog: (show) => set({ showEditDialog: show }),

  setEditingPost: (post) => {
    if (!post) return
    const { id, title, body, userId } = post;
    set({
      editingPost: { id, title, body, userId },
      showEditDialog: true
    });
  },

  updateEditingPost: (postData) =>
    set((state) => ({
      editingPost: state.editingPost
        ? { ...state.editingPost, ...postData }
        : null
    })),

  handleInputChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      editingPost: state.editingPost
        ? {
          ...state.editingPost,
          [name]: name === "userId" ? Number(value) : value
        }
        : null
    }));
  }
}));