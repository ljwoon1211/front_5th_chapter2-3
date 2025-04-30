import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { PostItem } from "../../../entities/post/ui"
import { Post } from "../../../entities/post/model"

interface PostListProps {
  posts: Post[]
  loading: boolean
  onDeletePost: (postId: number) => void
}

export const PostList = ({ posts, loading, onDeletePost }: PostListProps) => {
  if (loading) {
    return <div className="flex justify-center p-4">로딩 중...</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <PostItem post={post} onDeletePost={onDeletePost} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
