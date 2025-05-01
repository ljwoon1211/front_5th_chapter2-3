import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { Comment } from "../model/types"
import { highlightText } from "../../../shared/lib/text"

interface CommentItemProps {
  comment: Comment
  searchQuery?: string
  onLike?: (comment: Comment) => void
  onEdit?: (comment: Comment) => void
  onDelete?: (id: number) => void
}

export const CommentItem = ({ comment, searchQuery = "", onLike, onEdit, onDelete }: CommentItemProps) => {
  const handleLike = () => {
    if (onLike) onLike(comment)
  }

  const handleEdit = () => {
    if (onEdit) onEdit(comment)
  }

  const handleDelete = () => {
    if (onDelete) onDelete(comment.id)
  }

  return (
    <div className="flex flex-wrap items-start justify-between text-sm border-b pb-1">
      <div className="flex-1 min-w-0 mr-2">
        {comment.user && (
          <>
            <span className="font-medium">{comment.user.username}:</span>
            <span className="break-words">{highlightText(comment.body, searchQuery)}</span>
          </>
        )}
      </div>

      <div className="flex flex-shrink-0 items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={handleLike}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes || 0}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleEdit}>
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDelete}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
