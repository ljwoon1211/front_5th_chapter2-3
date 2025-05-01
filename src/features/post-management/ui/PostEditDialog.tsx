// import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
// import { usePostFormStore } from "../model/post-form-store"
// import { useUpdatePostMutation } from "../api/post-mutations"
// import { useEffect } from "react"
// import { useModalStore } from "../../ui/model/model-store"

// /**
//  * 게시물 수정 대화상자 컴포넌트
//  */
// export const PostEditDialog = () => {
//   // 모달 상태 관리
//   const { isPostEditDialogOpen, closePostEditDialog, selectedPost } = useModalStore()

//   // 폼 상태 관리
//   const { editablePost, setEditablePost, handleEditablePostChange, resetEditablePost } = usePostFormStore()

//   // 게시물 수정 뮤테이션
//   const { mutate: updatePost, isPending } = useUpdatePostMutation()

//   // 선택된 게시물이 변경되면 편집 가능한 폼 상태 업데이트
//   useEffect(() => {
//     if (selectedPost && isPostEditDialogOpen) {
//       setEditablePost({
//         id: selectedPost.id,
//         title: selectedPost.title,
//         body: selectedPost.body,
//         userId: selectedPost.userId,
//       })
//     }
//   }, [selectedPost, isPostEditDialogOpen, setEditablePost])

//   // 제출 핸들러
//   const handleSubmit = () => {
//     if (!editablePost || !editablePost.title || !editablePost.body) return

//     updatePost(editablePost, {
//       onSuccess: () => {
//         closePostEditDialog()
//         resetEditablePost()
//       },
//     })
//   }

//   // 대화상자 닫기 핸들러
//   const handleClose = () => {
//     closePostEditDialog()
//     resetEditablePost()
//   }

//   // 선택된 게시물이나 편집 가능한 데이터가 없으면 렌더링하지 않음
//   if (!selectedPost || !editablePost) return null

//   return (
//     <Dialog open={isPostEditDialogOpen} onOpenChange={handleClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>게시물 수정</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4">
//           <Input
//             name="title"
//             placeholder="제목"
//             value={editablePost.title || ""}
//             onChange={handleEditablePostChange}
//             disabled={isPending}
//           />
//           <Textarea
//             name="body"
//             rows={15}
//             placeholder="내용"
//             value={editablePost.body || ""}
//             onChange={handleEditablePostChange}
//             disabled={isPending}
//           />
//           <Button onClick={handleSubmit} disabled={!editablePost.title || !editablePost.body || isPending}>
//             {isPending ? "업데이트 중..." : "게시물 업데이트"}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { usePostFormStore } from "../model/post-form-store"
import { useUpdatePostMutation } from "../api/post-mutations"
import { useEffect } from "react"
import { usePostModalStore } from "../../modals"

export const PostEditDialog = () => {
  // 모달 상태 관리
  const { isPostEditDialogOpen, closePostEditDialog, selectedPost } = usePostModalStore()

  // 폼 상태 관리
  const { editablePost, setEditablePost, handleEditablePostChange, resetEditablePost } = usePostFormStore()

  // 게시물 수정 뮤테이션
  const { mutate: updatePost, isPending } = useUpdatePostMutation()

  useEffect(() => {
    if (selectedPost && isPostEditDialogOpen) {
      setEditablePost({
        id: selectedPost.id,
        title: selectedPost.title,
        body: selectedPost.body,
        userId: selectedPost.userId,
      })
    }
  }, [selectedPost, isPostEditDialogOpen, setEditablePost])

  const handleSubmit = () => {
    if (!editablePost || !editablePost.title || !editablePost.body) return

    updatePost(editablePost, {
      onSuccess: () => {
        closePostEditDialog()
        resetEditablePost()
      },
    })
  }

  const handleClose = () => {
    closePostEditDialog()
    resetEditablePost()
  }

  if (!selectedPost || !editablePost) return null

  return (
    <Dialog open={isPostEditDialogOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="title"
            placeholder="제목"
            value={editablePost.title || ""}
            onChange={handleEditablePostChange}
            disabled={isPending}
          />
          <Textarea
            name="body"
            rows={15}
            placeholder="내용"
            value={editablePost.body || ""}
            onChange={handleEditablePostChange}
            disabled={isPending}
          />
          <Button onClick={handleSubmit} disabled={!editablePost.title || !editablePost.body || isPending}>
            {isPending ? "업데이트 중..." : "게시물 업데이트"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
