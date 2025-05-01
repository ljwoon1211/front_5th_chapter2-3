import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { Comment } from "../model/types"
import { highlightText } from "../../../shared/lib/text"

interface CommentListProps {
  comments: Comment[]
  searchQuery?: string
  postId: number
  onCommentEdit?: (comment: Comment) => void
  onCommentDelete?: (id: number, postId: number) => void
  onCommentLike?: (comment: Comment, postId: number) => void
}

export const CommentList = ({
  comments,
  searchQuery = "",
  postId,
  onCommentEdit,
  onCommentDelete,
  onCommentLike,
}: CommentListProps) => {
  const handleDeleteComment = (id: number) => {
    if (onCommentDelete) {
      onCommentDelete(id, postId)
    }
  }

  const handleLikeComment = (comment: Comment) => {
    if (onCommentLike) {
      onCommentLike(comment, postId)
    }
  }

  const handleEditComment = (comment: Comment) => {
    if (onCommentEdit) {
      onCommentEdit(comment)
    }
  }
  return (
    <div className="space-y-1">
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-wrap items-start justify-between text-sm border-b pb-1">
          <div className="flex-1 min-w-0 mr-2">
            {comment.user && (
              <>
                <span className="font-medium">{comment.user.username}:</span>
                <span className="break-words">{highlightText(comment.body, searchQuery)}</span>
              </>
            )}
          </div>

          <div className="flex flex-shrink-0 items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment)}>
              <ThumbsUp className="w-3 h-3" />
              <span className="ml-1 text-xs">{comment.likes || 0}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleEditComment(comment)}>
              <Edit2 className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
