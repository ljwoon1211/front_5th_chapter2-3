import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"

import { PostList } from "../widgets/post-list/ui/PostList"
import { PostAddDialog } from "../features/post-management/ui/PostAddDialog"
import { PostEditDialog } from "../features/post-management/ui/PostEditDialog"
import { PostDetailDialog } from "../features/post-management/ui/PostDetailDialog"
import { CommentAddDialog } from "../features/comment-management/ui/CommentAddDialog"
import { CommentEditDialog } from "../features/comment-management/ui/CommentEditDialog"
import { UserDetailDialog } from "../features/user-management/ui/UserDetailDialog"
import { usePostModalStore } from "../features/modals"

const PostsManager = () => {
  const { openPostAddDialog } = usePostModalStore()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={openPostAddDialog}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <CardContent>
            <PostList />
          </CardContent>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog />

      {/* 댓글 수정 대화상자 */}
      <CommentEditDialog />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />

      {/* 사용자 모달 */}
      <UserDetailDialog />
    </Card>
  )
}

export default PostsManager
