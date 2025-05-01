// import { Plus } from "lucide-react"
// import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
// import { usePostFilterUIStore } from "../../post-filtering/model/post-filter-ui-store"
// import { useModalStore } from "../../ui/model/model-store"
// import { useCommentsQuery } from "../../comment-management/api/comment-queries"
// import { CommentList } from "../../comment-management/ui/CommentList"

// export const PostDetailDialog = () => {
//   const { isPostDetailDialogOpen, closePostDetailDialog, selectedPost, openCommentAddDialog } = useModalStore()
//   const { inputValue } = usePostFilterUIStore()

//   const { data: commentsData, isLoading: isCommentsLoading } = useCommentsQuery(selectedPost?.id || 0)

//   const highlightText = (text: string, highlight?: string) => {
//     if (!text) return null
//     if (!highlight?.trim()) {
//       return <span>{text}</span>
//     }
//     const regex = new RegExp(`(${highlight})`, "gi")
//     const parts = text.split(regex)
//     return (
//       <span>
//         {parts.map((part, i) =>
//           regex.test(part) ? (
//             <mark key={i} className="bg-yellow-200">
//               {part}
//             </mark>
//           ) : (
//             <span key={i}>{part}</span>
//           ),
//         )}
//       </span>
//     )
//   }

//   if (!selectedPost) return null

//   return (
//     <Dialog open={isPostDetailDialogOpen} onOpenChange={closePostDetailDialog}>
//       <DialogContent className="max-w-3xl">
//         <DialogHeader>
//           <DialogTitle>{highlightText(selectedPost.title, inputValue)}</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4">
//           <p className="whitespace-pre-line">{highlightText(selectedPost.body, inputValue)}</p>

//           {/* 댓글 섹션 */}
//           <div className="mt-2">
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="text-sm font-semibold">댓글</h3>
//               <Button size="sm" onClick={() => openCommentAddDialog(selectedPost)}>
//                 <Plus className="w-3 h-3 mr-1" />
//                 댓글 추가
//               </Button>
//             </div>

//             {/* 댓글 목록 */}
//             {isCommentsLoading ? (
//               <div className="flex justify-center p-4">로딩 중...</div>
//             ) : (
//               <CommentList comments={commentsData?.comments || []} searchQuery={inputValue} postId={selectedPost.id} />
//             )}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { usePostModalStore } from "../../modals"
import { usePostFilterUIStore } from "../../post-filtering/model/post-filter-ui-store"
import { PostDetailWidget } from "../../../widgets/post-detail"
import { useCommentModalStore } from "../../modals"
import { highlightText } from "../../../shared/lib/text"

export const PostDetailDialog = () => {
  const { isPostDetailDialogOpen, closePostDetailDialog, selectedPost } = usePostModalStore()
  const { openCommentAddDialog } = useCommentModalStore()
  const { inputValue } = usePostFilterUIStore()

  if (!selectedPost) return null

  return (
    <Dialog open={isPostDetailDialogOpen} onOpenChange={closePostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost.title, inputValue)}</DialogTitle>
        </DialogHeader>

        <PostDetailWidget post={selectedPost} searchQuery={inputValue} onCommentAdd={openCommentAddDialog} />
      </DialogContent>
    </Dialog>
  )
}
