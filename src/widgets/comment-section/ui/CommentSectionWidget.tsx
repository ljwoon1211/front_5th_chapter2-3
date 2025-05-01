import { Comment } from "../../../entities/comment/model/types"
import { CommentListWidget } from "../../comment-list/ui/CommentListWidget"
import { Button } from "../../../shared/ui"
import { Plus } from "lucide-react"

interface CommentSectionWidgetProps {
  comments: Comment[]
  searchQuery?: string
  postId: number
  isLoading?: boolean
  onAddComment?: () => void
  onEditComment?: (comment: Comment) => void
  onDeleteComment?: (id: number, postId: number) => void
  onLikeComment?: (comment: Comment, postId: number) => void
}

export const CommentSectionWidget = ({
  comments,
  searchQuery,
  postId,
  isLoading = false,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
}: CommentSectionWidgetProps) => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={onAddComment}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-4">로딩 중...</div>
      ) : (
        <CommentListWidget
          comments={comments}
          searchQuery={searchQuery}
          postId={postId}
          onCommentEdit={onEditComment}
          onCommentDelete={onDeleteComment}
          onCommentLike={onLikeComment}
        />
      )}
    </div>
  )
}
