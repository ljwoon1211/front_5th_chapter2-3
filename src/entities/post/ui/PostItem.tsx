import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Button, TableCell } from "../../../shared/ui"
import { Post } from "../model"

interface PostItemProps {
  post: Post
  searchQuery?: string
  selectedTag?: string
  onSetSelectedTag: (tag: string) => void
  onUpdateURL: () => void
  onOpenUserModal: (author: string) => void
  onOpenPostDetail: (post: Post) => void
  onSetSelectedPost: (post: Post) => void
  onSetShowEditDialog: (arg: boolean) => void
  onDeletePost: (postId: number) => void
}

// 텍스트 하이라이트 함수
const highlightText = (text: string, highlight?: string) => {
  if (!text) return null
  if (!highlight?.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)
  return (
    <span>
      {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
    </span>
  )
}

export const PostItem = ({
  post,
  searchQuery,
  selectedTag,
  onSetSelectedTag,
  onUpdateURL,
  onOpenUserModal,
  onOpenPostDetail,
  onSetSelectedPost,
  onSetShowEditDialog,
  onDeletePost,
}: PostItemProps) => {
  return (
    <>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>

          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                }`}
                onClick={() => {
                  onSetSelectedTag(tag)
                  onUpdateURL()
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onOpenUserModal(post.author)}>
          <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
          <span>{post.author?.username}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions?.likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onOpenPostDetail(post)}>
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onSetSelectedPost(post)
              onSetShowEditDialog(true)
            }}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDeletePost(post.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </>
  )
}
