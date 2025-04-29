import { create } from 'zustand';
import { User } from '../../../entities/user/model';

interface UserModalState {
  showUserModal: boolean;
  selectedUser: User | null;
  setShowUserModal: (show: boolean) => void;
  setSelectedUser: (user: User) => void;
  openUserModal: (user: User) => void;
  closeUserModal: () => void;
}

export const useUserModalStore = create<UserModalState>((set) => ({
  showUserModal: false,
  selectedUser: null,
  setShowUserModal: (opened: boolean) => set({ showUserModal: opened }),
  setSelectedUser: (user: User) => set({ selectedUser: user }),
  openUserModal: (user: User) => set({ showUserModal: true, selectedUser: user }),
  closeUserModal: () => set({ showUserModal: false, selectedUser: null }),
}));

