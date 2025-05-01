import { useEffect } from "react"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { PostItem } from "../../../entities/post/ui"
import { Tag } from "../../../entities/tag/model"
import { usePostFilterStore } from "../../post-filtering/model/post-filter-store2"
import { PostFilters } from "../../post-filtering/ui/PostFilters"
import { Post } from "../../../entities/post/model"

interface PostListProps {
  tags: Tag[]
  posts?: Post[]
  onDeletePost: (postId: number) => void
}

export const PostList = ({ tags = [], posts, onDeletePost }: PostListProps) => {
  const {
    // 상태
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    filteredPosts,
    isLoading,
    isSearchExecuted,

    // 액션
    setSearchQuery,
    setSelectedTag,
    setSortBy,
    setSortOrder,

    // 데이터 로드 액션
    searchPosts,
    fetchPostsByTag,
    updateURL,
  } = usePostFilterStore()

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      // URL 파라미터 파싱
      const params = new URLSearchParams(window.location.search)
      const queryParam = params.get("q") || ""
      const tagParam = params.get("tag") || "all"
      const sortParam = params.get("sort") || "none"
      const orderParam = params.get("order") || "asc"

      // 상태 업데이트
      setSearchQuery(queryParam)
      setSelectedTag(tagParam)
      setSortBy(sortParam)
      setSortOrder(orderParam)

      // 검색어가 있으면 검색, 없으면 태그 기반 로드
      if (queryParam) {
        searchPosts()
      } else {
        fetchPostsByTag(tagParam)
      }
    }

    if (!posts || posts.length === 0) {
      loadInitialData()
    }
  }, [])

  const displayPosts = isSearchExecuted
    ? filteredPosts //
    : posts && posts.length > 0
      ? posts
      : filteredPosts
  return (
    <>
      {/* 필터링 컴포넌트 */}
      <PostFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={searchPosts}
        tags={tags}
        selectedTag={selectedTag}
        onTagChange={(value) => {
          setSelectedTag(value)
          fetchPostsByTag(value)
          updateURL()
        }}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      {/* 게시물 목록 테이블 */}
      {isLoading ? (
        <div className="flex justify-center p-4">로딩 중...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">게시물이 없습니다.</div>
      ) : (
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
            {displayPosts?.map((post) => (
              <TableRow key={post.id}>
                <PostItem post={post} onDeletePost={onDeletePost} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
