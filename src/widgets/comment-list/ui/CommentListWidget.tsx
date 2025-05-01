import { Comment } from "../../../entities/comment/model/types"
import { CommentItem } from "../../../entities/comment/ui/CommentItem"

interface CommentListWidgetProps {
  comments: Comment[]
  searchQuery?: string
  postId: number
  onCommentEdit?: (comment: Comment) => void
  onCommentDelete?: (id: number, postId: number) => void
  onCommentLike?: (comment: Comment, postId: number) => void
}

export const CommentListWidget = ({
  comments,
  searchQuery = "",
  postId,
  onCommentEdit,
  onCommentDelete,
  onCommentLike,
}: CommentListWidgetProps) => {
  const handleLike = (comment: Comment) => {
    if (onCommentLike) {
      onCommentLike(comment, postId)
    }
  }

  const handleEdit = (comment: Comment) => {
    if (onCommentEdit) {
      onCommentEdit(comment)
    }
  }

  const handleDelete = (id: number) => {
    if (onCommentDelete) {
      onCommentDelete(id, postId)
    }
  }

  return (
    <div className="space-y-1">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          searchQuery={searchQuery}
          onLike={handleLike}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}
