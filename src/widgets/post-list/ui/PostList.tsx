import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { PostItem } from "../../../entities/post/ui/PostItem"
import { Post } from "../../../entities/post/model"
import { PostFilters } from "../../../features/post-filtering/ui/PostFilters"
import { PostPagination } from "../../../features/post-management/ui/PostPagination"
import { usePostFilterUIStore } from "../../../features/post-filtering/model/post-filter-ui-store"
import {
  usePostsQuery,
  useSearchPostsQuery,
  useTagsQuery,
  usePostsByTagQuery,
} from "../../../features/post-management/api/post-queries"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const PostList = () => {
  const navigate = useNavigate()
  const location = useLocation()

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
      {isLoading ? (
        <div className="flex justify-center p-4">로딩 중...</div>
      ) : postsData?.posts && postsData.posts.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-[150px]">작성자</TableHead>
              <TableHead className="w-[100px]">반응</TableHead>
              <TableHead className="w-[150px]">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postsData.posts.map((post: Post) => (
              <TableRow key={post.id}>
                <PostItem post={post} searchQuery={inputValue} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {search ? `'${search}' 검색 결과가 없습니다.` : "게시물이 없습니다."}
        </div>
      )}

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
