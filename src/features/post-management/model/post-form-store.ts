import { create } from 'zustand';
import { NewPost, EditablePost } from '../../../entities/post/model';

interface PostFormState {
  newPost: NewPost;
  editablePost: EditablePost | null;

  setNewPost: (post: Partial<NewPost>) => void;
  setEditablePost: (post: EditablePost | null) => void;
  updateNewPost: (field: keyof NewPost, value: string | number) => void;
  updateEditablePost: (field: keyof EditablePost, value: string | number) => void;
  resetNewPost: () => void;
  resetEditablePost: () => void;

  handleNewPostChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleEditablePostChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const initialNewPost: NewPost = {
  title: '',
  body: '',
  userId: 1,
};

export const usePostFormStore = create<PostFormState>((set) => ({
  newPost: { ...initialNewPost },
  editablePost: null,

  setNewPost: (post) => set((state) => ({
    newPost: { ...state.newPost, ...post }
  })),

  setEditablePost: (post) => set({
    editablePost: post
  }),

  updateNewPost: (field, value) => set((state) => ({
    newPost: { ...state.newPost, [field]: value }
  })),

  updateEditablePost: (field, value) => set((state) => ({
    editablePost: state.editablePost
      ? { ...state.editablePost, [field]: value }
      : null
  })),

  resetNewPost: () => set({
    newPost: { ...initialNewPost }
  }),

  resetEditablePost: () => set({
    editablePost: null
  }),

  handleNewPostChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      newPost: {
        ...state.newPost,
        [name]: name === 'userId' ? Number(value) : value
      }
    }));
  },

  handleEditablePostChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      editablePost: state.editablePost
        ? {
          ...state.editablePost,
          [name]: name === 'userId' || name === 'id'
            ? Number(value)
            : value
        }
        : null
    }));
  },
}));