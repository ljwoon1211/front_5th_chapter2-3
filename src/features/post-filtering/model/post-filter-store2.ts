import { create } from "zustand"
import { Post } from "../../../entities/post/model"
import * as postApi from "../api"

interface PostFilterState {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: string
  filteredPosts: Post[]
  isLoading: boolean
  selectedPost: Post | null
  isDetailModalOpen: boolean

  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (value: string) => void
  setSortOrder: (value: string) => void
  searchPosts: () => Promise<void>
  fetchPostsByTag: (tag: string) => Promise<void>
  sortPosts: () => void
  openPostDetail: (post: Post) => void
  closePostDetail: () => void
  updateURL: () => void
}

export const usePostFilterStore = create<PostFilterState>((set, get) => ({
  // 초기 상태
  searchQuery: "",
  selectedTag: "all",
  sortBy: "none",
  sortOrder: "asc",
  filteredPosts: [], // 명시적으로 빈 배열로 초기화
  isLoading: false,
  selectedPost: null,
  isDetailModalOpen: false,

  // 설정 액션
  setSearchQuery: (query) => set({ searchQuery: query }),

  setSelectedTag: (tag) => set({ selectedTag: tag }),

  setSortBy: (value) => {
    set({ sortBy: value })
    get().sortPosts()
  },

  setSortOrder: (value) => {
    set({ sortOrder: value })
    get().sortPosts()
  },

  // 데이터 관련 액션
  searchPosts: async () => {
    const { searchQuery } = get()
    set({ isLoading: true })

    try {
      if (!searchQuery.trim()) {
        const result = await postApi.fetchPosts(100, 0)
        const posts = result && result.posts ? result.posts : []
        set({ filteredPosts: posts })
      } else {
        const result = await postApi.searchPosts(searchQuery)
        const posts = result && result.posts ? result.posts : []
        set({ filteredPosts: posts })
      }
    } catch (error) {
      console.error("게시물 검색 오류:", error)
      set({ filteredPosts: [] }) // 오류 시 빈 배열 설정
    } finally {
      set({ isLoading: false })
    }

    // 검색 후 정렬 적용
    get().sortPosts()
    get().updateURL()
  },

  fetchPostsByTag: async (tag) => {
    set({ isLoading: true })

    try {
      const result = await postApi.fetchPostsByTag(tag)
      const posts = result && result.posts ? result.posts : []
      set({ filteredPosts: posts })
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
      set({ filteredPosts: [] }) // 오류 시 빈 배열 설정
    } finally {
      set({ isLoading: false })
    }

    get().sortPosts()
  },

  sortPosts: () => {
    const { filteredPosts, sortBy, sortOrder } = get()

    if (sortBy === "none" || !Array.isArray(filteredPosts) || filteredPosts.length === 0) return

    const sorted = [...filteredPosts].sort((a, b) => {
      let comparison = 0

      // 정렬 기준에 따른 비
      if (sortBy === "id") {
        comparison = a.id - b.id
      } else if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title)
      } else if (sortBy === "reactions") {
        comparison = (a.reactions?.total || 0) - (b.reactions?.total || 0)
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    set({ filteredPosts: sorted })
  },

  // 게시물 상세 관련 액션
  openPostDetail: (post) => set({
    selectedPost: post,
    isDetailModalOpen: true
  }),

  closePostDetail: () => set({
    isDetailModalOpen: false
  }),

  updateURL: () => {
    const { searchQuery, selectedTag, sortBy, sortOrder } = get()

    // URL 파라미터 생성
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (selectedTag !== "all") params.set("tag", selectedTag)
    if (sortBy !== "none") params.set("sort", sortBy)
    if (sortOrder !== "asc") params.set("order", sortOrder)

    // URL 히스토리 업데이트
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({ path: newUrl }, "", newUrl)
  }
}))