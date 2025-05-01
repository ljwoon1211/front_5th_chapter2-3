import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Button, TableCell } from "../../../shared/ui"
import { Post } from "../model/types"
import { useDeletePostMutation } from "../../../features/post-management/api/post-mutations"
import { useModalStore } from "../../../features/ui/model/model-store"
import { usePostFilterUIStore } from "../../../features/post-filtering/model/post-filter-ui-store"

interface PostItemProps {
  post: Post
  searchQuery?: string
}

export const PostItem = ({ post, searchQuery = "" }: PostItemProps) => {
  const { openPostDetailDialog, openPostEditDialog, openUserDetailDialog } = useModalStore()

  const { tag: selectedTag, setSelectedTag } = usePostFilterUIStore()
  const { mutate: deletePost } = useDeletePostMutation()

  const highlightText = (text: string, highlight?: string) => {
    if (!text) return null
    if (!highlight?.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-yellow-200">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </span>
    )
  }

  const handleDeletePost = () => {
    deletePost(post.id)
  }
  const handleTagSelect = (tagName: string) => {
    setSelectedTag(tagName)
  }

  return (
    <>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                    selectedTag === tag
                      ? "text-white bg-blue-500 hover:bg-blue-600"
                      : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                  }`}
                  onClick={() => handleTagSelect(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </TableCell>

      <TableCell>
        {post.author && (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              console.log("Author data:", post.author) // 데이터 확인
              if (post.author) {
                openUserDetailDialog(post.author)
              } else {
                console.error("Author data is missing")
              }
            }}
          >
            <img src={post.author.image} alt={post.author.username} className="w-8 h-8 rounded-full" />
            <span>{post.author.username}</span>
          </div>
        )}
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
          <Button variant="ghost" size="sm" onClick={() => openPostDetailDialog(post)}>
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => openPostEditDialog(post)}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDeletePost}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </>
  )
}
