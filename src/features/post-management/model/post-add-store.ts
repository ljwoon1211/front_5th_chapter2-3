import { create } from "zustand";
import { NewPost } from "../../../entities/post/model";


interface PostAddState {
  showAddDialog: boolean;
  newPost: NewPost
  // 액션
  setShowAddDialog: (show: boolean) => void;
  setNewPost: (post: Partial<NewPost>) => void;
  resetNewPost: () => void;

  // 유틸리티 메소드
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

// 초기 상태
const initialPostState = {
  title: "",
  body: "",
  userId: 1,
};

export const usePostAddStore = create<PostAddState>((set) => ({
  showAddDialog: false,
  newPost: { ...initialPostState },

  setShowAddDialog: (show) => set({ showAddDialog: show }),

  setNewPost: (postData) =>
    set((state) => ({
      newPost: { ...state.newPost, ...postData }
    })),

  resetNewPost: () => set({ newPost: { ...initialPostState } }),

  handleInputChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      newPost: {
        ...state.newPost,
        [name]: name === "userId" ? Number(value) : value
      }
    }));
  }
}));