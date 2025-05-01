import { create } from "zustand";
import { Post } from '../../../entities/post/model/type';

interface PostFilterState {
  searchQuery: string;
  selectedTag: string;
  sortBy: string;
  sortOrder: string;
  skip: number;
  limit: number;
  selectedPost: Post | null;
  showPostDetailDialog: boolean;

  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: string) => void;
  setSkip: (skip: number) => void;
  setLimit: (limit: number) => void;
  setSelectedPost: (post: Post | null) => void;
  setShowPostDetailDialog: (show: boolean) => void;
  openPostDetail: (post: Post) => void;
  updateURL: () => void;
}

export const usePostFilterStore = create<PostFilterState>((set, get) => ({
  searchQuery: '',
  selectedTag: '',
  sortBy: '',
  sortOrder: 'asc',
  skip: 0,
  limit: 10,
  selectedPost: null,
  showPostDetailDialog: false,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),

  openPostDetail: (post) => {
    set({
      selectedPost: post,
      showPostDetailDialog: true
    });
  },

  updateURL: () => {
    const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag } = get();
    const params = new URLSearchParams();

    if (skip) params.set("skip", skip.toString());
    if (limit) params.set("limit", limit.toString());
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (selectedTag) params.set("tag", selectedTag);

    return params.toString();
  }
}));