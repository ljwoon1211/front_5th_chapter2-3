import { create } from 'zustand';
import { Comment, EditableComment, NewComment } from '../../../entities/comment/model/types';

interface CommentFormState {
  newComment: NewComment;
  editingComment: Comment | null;

  setNewComment: (comment: Partial<NewComment>) => void;
  setEditingComment: (comment: Comment | null) => void;
  updateNewComment: (field: keyof NewComment, value: string | number) => void;
  updateEditingComment: (field: keyof EditableComment, value: string | number) => void;
  resetNewComment: () => void;
  resetEditingComment: () => void;

  setCurrentPostId: (postId: number) => void;

  handleNewCommentChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleEditingCommentChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const initialNewComment: NewComment = {
  body: '',
  postId: 0,
  userId: 1,
};

export const useCommentFormStore = create<CommentFormState>((set) => ({
  newComment: { ...initialNewComment },
  editingComment: null,

  setNewComment: (comment) => set((state) => ({
    newComment: { ...state.newComment, ...comment }
  })),
  setEditingComment: (comment) => set({
    editingComment: comment
  }),
  updateNewComment: (field, value) => set((state) => ({
    newComment: { ...state.newComment, [field]: value }
  })),
  updateEditingComment: (field, value) => set((state) => ({
    editingComment: state.editingComment
      ? { ...state.editingComment, [field]: value }
      : null
  })),
  resetNewComment: () => set((state) => ({
    newComment: { ...initialNewComment, postId: state.newComment.postId }
  })),
  resetEditingComment: () => set({
    editingComment: null
  }),
  setCurrentPostId: (postId) => set((state) => ({
    newComment: { ...state.newComment, postId }
  })),

  handleNewCommentChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      newComment: {
        ...state.newComment,
        [name]: name === 'userId' || name === 'postId' ? Number(value) : value
      }
    }));
  },

  handleEditingCommentChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      editingComment: state.editingComment
        ? {
          ...state.editingComment,
          [name]: name === 'userId' || name === 'postId' || name === 'id'
            ? Number(value)
            : value
        }
        : null
    }));
  },
}));