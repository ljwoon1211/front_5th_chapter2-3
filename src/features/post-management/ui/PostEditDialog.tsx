import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import * as postApi from "../api"
import { Post } from "../../../entities/post/model"
import { usePostEditStore } from "../model/post-edit-store"

interface PostEditDialogProps {
  posts: Post[]
  onSetPosts: (posts: Post[]) => void
}

export const PostEditDialog = ({ posts, onSetPosts }: PostEditDialogProps) => {
  const { editingPost, showEditDialog, setShowEditDialog, handleInputChange } = usePostEditStore()

  const handleSubmit = async () => {
    if (!editingPost || !editingPost.title || !editingPost.body) return

    try {
      const updatedPost = await postApi.updatePost({
        ...editingPost,
      })
      onSetPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" value={editingPost?.title || ""} onChange={handleInputChange} />
          <Textarea rows={15} placeholder="내용" value={editingPost?.body || ""} onChange={handleInputChange} />
          <Button onClick={handleSubmit}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
