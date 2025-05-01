// import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
// import { Button } from "../../../shared/ui"
// import { Comment } from "../../../entities/comment/model/types"
// import { useDeleteCommentMutation, useLikeCommentMutation } from "../api/comment-mutations"
// import { useModalStore } from "../../ui/model/model-store"

// interface CommentListProps {
//   comments: Comment[]
//   searchQuery?: string
//   postId: number
// }

// export const CommentList = ({ comments, searchQuery = "", postId }: CommentListProps) => {
//   const { openCommentEditDialog } = useModalStore()

//   const { mutate: deleteComment } = useDeleteCommentMutation()
//   const { mutate: likeComment } = useLikeCommentMutation()

//   const highlightText = (text: string, highlight?: string) => {
//     if (!text) return null
//     if (!highlight?.trim()) {
//       return <span>{text}</span>
//     }
//     const regex = new RegExp(`(${highlight})`, "gi")
//     const parts = text.split(regex)
//     return (
//       <span>
//         {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
//       </span>
//     )
//   }

//   const handleDeleteComment = (id: number) => {
//     deleteComment({ id, postId })
//   }

//   const handleLikeComment = (comment: Comment) => {
//     const currentLikes = comment.likes || 0
//     likeComment({ id: comment.id, likes: currentLikes, postId: postId })
//   }

//   return (
//     <div className="space-y-1">
//       {comments.map((comment) => (
//         <div key={comment.id} className="flex flex-wrap items-start justify-between text-sm border-b pb-1">
//           <div className="flex-1 min-w-0 mr-2">
//             {comment.user && (
//               <>
//                 <span className="font-medium">{comment.user.username}:</span>
//                 <span className="break-words">{highlightText(comment.body, searchQuery)}</span>
//               </>
//             )}
//           </div>

//           <div className="flex flex-shrink-0 items-center space-x-1">
//             <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment)}>
//               <ThumbsUp className="w-3 h-3" />
//               <span className="ml-1 text-xs">{comment.likes || 0}</span>
//             </Button>
//             <Button variant="ghost" size="sm" onClick={() => openCommentEditDialog(comment)}>
//               <Edit2 className="w-3 h-3" />
//             </Button>
//             <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id)}>
//               <Trash2 className="w-3 h-3" />
//             </Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }
