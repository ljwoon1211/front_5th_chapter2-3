import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { usePostModalStore } from "../../modals"
import { usePostFilterUIStore } from "../../post-filtering/model/post-filter-ui-store"
import { useCommentModalStore } from "../../modals"
import { highlightText } from "../../../shared/lib/text"
import { useDeleteCommentMutation, useLikeCommentMutation } from "../../comment-management/api/comment-mutations"
import { useCommentsQuery } from "../../../entities/comment/api/comment-queries"
import { Comment } from "../../../entities/comment/model"
import { CommentSectionWidget } from "../../../widgets/comment-section"

export const PostDetailDialog = () => {
  const { isPostDetailDialogOpen, closePostDetailDialog, selectedPost } = usePostModalStore()
  const { openCommentAddDialog } = useCommentModalStore()
  const { openCommentEditDialog } = useCommentModalStore()
  const { inputValue } = usePostFilterUIStore()

  const { mutate: deleteComment } = useDeleteCommentMutation()
  const { mutate: likeComment } = useLikeCommentMutation()

  const { data: commentsData, isLoading: isCommentsLoading } = useCommentsQuery(selectedPost?.id || 0)

  const handleCommentDelete = (id: number, postId: number) => {
    deleteComment({ id, postId })
  }

  const handleCommentLike = (comment: Comment, postId: number) => {
    const currentLikes = comment.likes || 0
    likeComment({ id: comment.id, likes: currentLikes, postId })
  }

  if (!selectedPost) return null

  return (
    <Dialog open={isPostDetailDialogOpen} onOpenChange={closePostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost.title, inputValue)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="whitespace-pre-line">{highlightText(selectedPost.body, inputValue)}</p>

          {/* CommentSectionWidget 사용 */}
          <CommentSectionWidget
            comments={commentsData?.comments || []}
            searchQuery={inputValue}
            postId={selectedPost.id}
            isLoading={isCommentsLoading}
            onAddComment={() => openCommentAddDialog(selectedPost)}
            onEditComment={(comment: Comment) => openCommentEditDialog(comment)}
            onDeleteComment={handleCommentDelete}
            onLikeComment={handleCommentLike}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
