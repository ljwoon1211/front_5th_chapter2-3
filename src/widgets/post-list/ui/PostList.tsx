import { PostTableWidget } from "../../post-table/ui/PostTableWidget"
import { PostFilters } from "../../../features/post-filtering/ui/PostFilters"
import { PostPagination } from "../../../features/post-management/ui/PostPagination"
import { usePostFilterUIStore } from "../../../features/post-filtering/model/post-filter-ui-store"
import {
  usePostsQuery,
  useSearchPostsQuery,
  useTagsQuery,
  usePostsByTagQuery,
} from "../../../entities/post/api/post-queries"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDeletePostMutation } from "../../../features/post-management/api/post-mutations"
import { usePostModalStore, useUserModalStore } from "../../../features/modals"

export const PostList = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { openPostDetailDialog, openPostEditDialog } = usePostModalStore()
  const { openUserDetailDialog } = useUserModalStore()
  const { mutate: deletePost } = useDeletePostMutation()

  // 필터 UI 상태 관리
  const {
    search,
    inputValue,
    tag,
    sortBy,
    sortOrder,
    skip,
    limit,
    setSearchQuery,
    setInputValue,
    setSelectedTag,
    setSortBy,
    setSortOrder,
    setSkip,
    setLimit,
    applyQueryParams,
    getQueryParams,
  } = usePostFilterUIStore()

  const { data: tagsData, isLoading: isTagsLoading } = useTagsQuery()

  const searchQueryResult = useSearchPostsQuery(search, {
    enabled: !!search,
  })

  const tagQueryResult = usePostsByTagQuery(tag, { skip, limit, sortBy, sortOrder }, { enabled: !!tag && !search })

  const postsQueryResult = usePostsQuery({ skip, limit, sortBy, sortOrder }, { enabled: !search && !tag })

  const postsData = searchQueryResult.data || tagQueryResult.data || postsQueryResult.data
  const isLoading =
    searchQueryResult.isLoading || tagQueryResult.isLoading || postsQueryResult.isLoading || isTagsLoading

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    applyQueryParams(params)
  }, [location.search, applyQueryParams])

  useEffect(() => {
    const params = getQueryParams()
    navigate(`?${params.toString()}`)
  }, [search, tag, sortBy, sortOrder, skip, limit, navigate, getQueryParams])

  useEffect(() => {
    setInputValue(search)
  }, [search, setInputValue])

  const handleSearch = () => {
    setSearchQuery(inputValue)
    setSkip(0)
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
  }

  const handleTagChange = (newTag: string) => {
    setSelectedTag(newTag)
    setSkip(0)
  }

  const handlePostDelete = (id: number) => {
    deletePost(id)
  }

  return (
    <div className="space-y-4">
      {/* 필터링 컴포넌트 */}
      <PostFilters
        searchQuery={inputValue}
        onSearchChange={handleInputChange}
        onSearch={handleSearch}
        tags={tagsData || []}
        selectedTag={tag}
        onTagChange={handleTagChange}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        isLoading={isLoading}
      />

      {/* 게시물 테이블 */}
      <PostTableWidget
        posts={postsData?.posts || []}
        searchQuery={inputValue}
        selectedTag={tag}
        onTagSelect={handleTagChange}
        onPostDetail={openPostDetailDialog}
        onPostEdit={openPostEditDialog}
        onPostDelete={handlePostDelete}
        onUserDetail={openUserDetailDialog}
        isLoading={isLoading}
      />

      {/* 페이지네이션 컴포넌트 */}
      {postsData && (
        <PostPagination
          total={postsData.total}
          skip={skip}
          limit={limit}
          onSkipChange={setSkip}
          onLimitChange={setLimit}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
