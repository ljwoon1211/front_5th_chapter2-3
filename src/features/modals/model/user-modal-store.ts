import { create } from 'zustand';
import { User } from '../../../entities/user/model';

interface UserModalState {
  isUserDetailDialogOpen: boolean;
  selectedUser: User | null;

  openUserDetailDialog: (user: User) => void;
  closeUserDetailDialog: () => void;
}

export const useUserModalStore = create<UserModalState>((set) => ({
  isUserDetailDialogOpen: false,
  selectedUser: null,

  openUserDetailDialog: (user) => set({
    isUserDetailDialogOpen: true,
    selectedUser: user
  }),
  closeUserDetailDialog: () => set({
    isUserDetailDialogOpen: false
  }),
}));