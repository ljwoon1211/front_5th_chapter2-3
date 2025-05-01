// import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
// import { useCommentFormStore } from "../model/comment-form-store"
// import { useAddCommentMutation } from "../api/comment-mutations"
// import { useEffect } from "react"
// import { useModalStore } from "../../ui/model/model-store"

// export const CommentAddDialog = () => {
//   // 모달 상태 관리
//   const { isCommentAddDialogOpen, closeCommentAddDialog, selectedPost } = useModalStore()

//   // 폼 상태 관리
//   const { newComment, handleNewCommentChange, resetNewComment, setCurrentPostId } = useCommentFormStore()

//   // 댓글 추가 뮤테이션
//   const { mutate: addComment, isPending } = useAddCommentMutation()

//   // 선택된 게시물 ID가 변경되면 현재 게시물 ID 업데이트
//   useEffect(() => {
//     if (selectedPost?.id) {
//       setCurrentPostId(selectedPost.id)
//     }
//   }, [selectedPost, setCurrentPostId])

//   // 제출 핸들러
//   const handleSubmit = () => {
//     if (!newComment.body || !newComment.postId) return

//     addComment(newComment, {
//       onSuccess: () => {
//         closeCommentAddDialog()
//         resetNewComment()
//       },
//     })
//   }

//   const handleClose = () => {
//     closeCommentAddDialog()
//   }

//   return (
//     <Dialog open={isCommentAddDialogOpen} onOpenChange={handleClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>새 댓글 추가</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4">
//           <Textarea
//             name="body"
//             placeholder="댓글 내용"
//             value={newComment.body}
//             onChange={handleNewCommentChange}
//             disabled={isPending}
//             rows={5}
//           />
//           <Button onClick={handleSubmit} disabled={!newComment.body || isPending}>
//             {isPending ? "추가 중..." : "댓글 추가"}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useCommentFormStore } from "../model/comment-form-store"
import { useAddCommentMutation } from "../api/comment-mutations"
import { useEffect } from "react"
import { useCommentModalStore } from "../../modals"

export const CommentAddDialog = () => {
  // 모달 상태 관리
  const { isCommentAddDialogOpen, closeCommentAddDialog, selectedPost } = useCommentModalStore()

  // 폼 상태 관리
  const { newComment, handleNewCommentChange, resetNewComment, setCurrentPostId } = useCommentFormStore()

  // 댓글 추가 뮤테이션
  const { mutate: addComment, isPending } = useAddCommentMutation()

  // 선택된 게시물 ID가 변경되면 현재 게시물 ID 업데이트
  useEffect(() => {
    if (selectedPost?.id) {
      setCurrentPostId(selectedPost.id)
    }
  }, [selectedPost, setCurrentPostId])

  // 제출 핸들러
  const handleSubmit = () => {
    if (!newComment.body || !newComment.postId) return

    addComment(newComment, {
      onSuccess: () => {
        closeCommentAddDialog()
        resetNewComment()
      },
    })
  }

  const handleClose = () => {
    closeCommentAddDialog()
  }

  return (
    <Dialog open={isCommentAddDialogOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            name="body"
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={handleNewCommentChange}
            disabled={isPending}
            rows={5}
          />
          <Button onClick={handleSubmit} disabled={!newComment.body || isPending}>
            {isPending ? "추가 중..." : "댓글 추가"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
