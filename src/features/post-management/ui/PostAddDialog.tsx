import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { usePostAddStore } from "../model/post-add-store"
import * as postApi from "../api"
import { Post } from "../../../entities/post/model"

interface PostAddDialogProps {
  posts: Post[]
  onSetPosts: (posts: Post[]) => void
}

export const PostAddDialog = ({ posts, onSetPosts }: PostAddDialogProps) => {
  const { newPost, showAddDialog, setShowAddDialog, resetNewPost, handleInputChange } = usePostAddStore()

  const handleSubmit = async () => {
    if (!newPost.title || !newPost.body) return

    try {
      const data = await postApi.addPost(newPost)
      onSetPosts([data, ...posts])
      if (isSearchExecuted) {
        // 검색 결과에 추가하는 함수 호출
        usePostFilterStore.getState().setFilteredPosts([data, ...filteredPosts])
      }
      setShowAddDialog(false)
      resetNewPost()
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input name="title" placeholder="제목" value={newPost.title} onChange={handleInputChange} />
          <Textarea name="body" rows={30} placeholder="내용" value={newPost.body} onChange={handleInputChange} />
          <Input
            name="userId"
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={handleInputChange}
          />
          <Button onClick={handleSubmit}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
