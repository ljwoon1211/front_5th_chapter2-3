import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { usePostFormStore } from "../model/post-form-store"
import { useAddPostMutation } from "../api/post-mutations"
import { usePostModalStore } from "../../modals"

export const PostAddDialog = () => {
  const { isPostAddDialogOpen, closePostAddDialog } = usePostModalStore()

  const { newPost, handleNewPostChange, resetNewPost } = usePostFormStore()

  const { mutate: addPost, isPending } = useAddPostMutation()

  const handleSubmit = () => {
    if (!newPost.title || !newPost.body) return

    addPost(newPost, {
      onSuccess: () => {
        closePostAddDialog()
        resetNewPost()
      },
    })
  }

  const handleClose = () => {
    closePostAddDialog()
    resetNewPost()
  }

  return (
    <Dialog open={isPostAddDialogOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="title"
            placeholder="제목"
            value={newPost.title}
            onChange={handleNewPostChange}
            disabled={isPending}
          />
          <Textarea
            name="body"
            rows={15}
            placeholder="내용"
            value={newPost.body}
            onChange={handleNewPostChange}
            disabled={isPending}
          />
          <Input
            name="userId"
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={handleNewPostChange}
            disabled={isPending}
          />
          <Button onClick={handleSubmit} disabled={!newPost.title || !newPost.body || isPending}>
            {isPending ? "추가 중..." : "게시물 추가"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
