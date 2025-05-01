import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { Post } from "../../../entities/post/model"
import { PostItem } from "../../../entities/post/ui/PostItem"
import { User } from "../../../entities/user/model"

interface PostTableWidgetProps {
  posts: Post[]
  searchQuery?: string
  selectedTag?: string
  onTagSelect?: (tag: string) => void
  onPostDetail?: (post: Post) => void
  onPostEdit?: (post: Post) => void
  onPostDelete?: (id: number) => void
  onUserDetail?: (user: User) => void
  isLoading?: boolean
}

export const PostTableWidget = ({
  posts,
  searchQuery = "",
  selectedTag = "",
  onTagSelect,
  onPostDetail,
  onPostEdit,
  onPostDelete,
  onUserDetail,
  isLoading = false,
}: PostTableWidgetProps) => {
  if (isLoading) {
    return <div className="flex justify-center p-4">로딩 중...</div>
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {searchQuery ? `'${searchQuery}' 검색 결과가 없습니다.` : "게시물이 없습니다."}
      </div>
    )
  }

  return (
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
        {posts.map((post) => (
          <TableRow key={post.id}>
            <PostItem
              post={post}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              onTagSelect={onTagSelect}
              onPostDetail={onPostDetail}
              onPostEdit={onPostEdit}
              onPostDelete={onPostDelete}
              onUserDetail={onUserDetail}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
