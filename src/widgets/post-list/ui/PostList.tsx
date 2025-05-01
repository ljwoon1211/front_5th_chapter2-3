import { useLocation, useNavigate } from "react-router-dom"
import { PostFilters } from "../../../features/post-filtering/ui/PostFilters2"
import { usePostFilterUIStore } from "../../../features/post-filtering/model/post-filter-ui-store"
import {
  usePostsByTagQuery,
  usePostsQuery,
  useSearchPostsQuery,
  useTagsQuery,
} from "../../../features/post-management/api/post-queries"
import { useEffect, useState } from "react"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { PostPagination } from "../../../features/post-management/ui/PostPagination2"
import { Post } from "../../../entities/post/model"
import { PostItem } from "../../../entities/post/ui/PostItem2"

export const PostList = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // 필터 UI 상태 관리
  const {
    search,
    tag,
    sortBy,
    sortOrder,
    skip,
    limit,
    setSearchQuery,
    setSelectedTag,
    setSortBy,
    setSortOrder,
    setSkip,
    setLimit,
    applyQueryParams,
    getQueryParams,
  } = usePostFilterUIStore()

  const [inputValue, setInputValue] = useState(search)

  const { data: tagsData, isLoading: isTagsLoading } = useTagsQuery()

  const searchQueryResult = useSearchPostsQuery(search || "", {
    enabled: !!search,
  })

  const tagQueryResult = usePostsByTagQuery(
    tag || "",
    { skip, limit, sortBy, sortOrder },
    { enabled: !!tag && !search },
  )

  const postsQueryResult = usePostsQuery({ skip, limit, sortBy, sortOrder }, { enabled: !search && !tag })

  const postsResult = searchQueryResult.data || tagQueryResult.data || postsQueryResult.data
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
  }, [search])

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
      ) : postsResult?.posts && postsResult.posts.length > 0 ? (
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
            {postsResult.posts.map((post: Post) => (
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

      {postsResult && (
        <PostPagination
          total={postsResult.total || 0}
          skip={skip || 0}
          limit={limit || 10}
          onSkipChange={setSkip}
          onLimitChange={setLimit}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
