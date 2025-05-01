import { create } from 'zustand';
import { PostFilterParams } from '../../../entities/post/model';

interface PostFilterUIState {
  skip: number;
  limit: number;
  search: string;
  tag: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';

  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  setSkip: (skip: number) => void;
  setLimit: (limit: number) => void;

  getQueryParams: () => URLSearchParams;
  applyQueryParams: (params: URLSearchParams) => void;

  resetFilters: () => void;
}

const initialState: PostFilterParams = {
  skip: 0,
  limit: 10,
  search: '',
  tag: '',
  sortBy: '',
  sortOrder: 'asc',
}

export const usePostFilterUIStore = create<PostFilterUIState>((set, get) => ({
  ...initialState,

  setSearchQuery: (search) => set({ search }),
  setSelectedTag: (tag) => set({ tag }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),

  getQueryParams: () => {
    const { skip, limit, search, tag, sortBy, sortOrder } = get();
    const params = new URLSearchParams();

    if (skip) params.set('skip', skip.toString());
    if (limit) params.set('limit', limit.toString());
    if (search) params.set('search', search);
    if (tag) params.set('tag', tag);
    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);

    return params;
  },

  applyQueryParams: (params) => {
    set({
      skip: parseInt(params.get('skip') || '0'),
      limit: parseInt(params.get('limit') || '10'),
      search: params.get('search') || '',
      tag: params.get('tag') || '',
      sortBy: params.get('sortBy') || '',
      sortOrder: (params.get('sortOrder') as 'asc' | 'desc') || 'asc',
    });
  },

  resetFilters: () => set(initialState),
}));