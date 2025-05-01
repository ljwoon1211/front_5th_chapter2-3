import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useCommentFormStore } from "../model/comment-form-store"
import { useUpdateCommentMutation } from "../api/comment-mutations"
import { useEffect } from "react"
import { useCommentModalStore } from "../../modals"

export const CommentEditDialog = () => {
  const { isCommentEditDialogOpen, closeCommentEditDialog, selectedComment } = useCommentModalStore()
  const { editingComment, setEditingComment, handleEditingCommentChange, resetEditingComment } = useCommentFormStore()

  const { mutate: updateComment, isPending } = useUpdateCommentMutation()

  useEffect(() => {
    if (selectedComment && isCommentEditDialogOpen) {
      setEditingComment(selectedComment)
    }
  }, [selectedComment, isCommentEditDialogOpen, setEditingComment])

  const handleSubmit = () => {
    if (!editingComment || !editingComment.body) return

    updateComment(
      {
        id: editingComment.id,
        body: editingComment.body,
      },
      {
        onSuccess: () => {
          closeCommentEditDialog()
          resetEditingComment()
        },
      },
    )
  }

  const handleClose = () => {
    closeCommentEditDialog()
    resetEditingComment()
  }

  if (!selectedComment || !editingComment) return null

  return (
    <Dialog open={isCommentEditDialogOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            name="body"
            placeholder="댓글 내용"
            value={editingComment.body}
            onChange={handleEditingCommentChange}
            disabled={isPending}
            rows={5}
          />
          <Button onClick={handleSubmit} disabled={!editingComment.body || isPending}>
            {isPending ? "업데이트 중..." : "댓글 업데이트"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
