import { Button } from "../../../shared/ui"
import { Plus } from "lucide-react"
import { Post } from "../../../entities/post/model"
// import { useCommentsQuery } from "../../../features/comment-management/api/comment-queries"
import { highlightText } from "../../../shared/lib/text"
import { useCommentsQuery } from "../../../entities/comment/api/comment-queries"
import { CommentList } from "../../../entities/comment/ui/CommentList"

interface PostDetailWidgetProps {
  post: Post | null
  searchQuery?: string
  onCommentAdd?: (post: Post) => void
}

export const PostDetailWidget = ({ post, searchQuery = "", onCommentAdd }: PostDetailWidgetProps) => {
  const { data: commentsData, isLoading: isCommentsLoading } = useCommentsQuery(post?.id || 0)

  if (!post) return null

  return (
    <div className="space-y-4">
      <p className="whitespace-pre-line">{highlightText(post.body, searchQuery)}</p>

      {/* 댓글 섹션 */}
      <div className="mt-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">댓글</h3>
          <Button size="sm" onClick={() => onCommentAdd && onCommentAdd(post)}>
            <Plus className="w-3 h-3 mr-1" />
            댓글 추가
          </Button>
        </div>

        {/* 댓글 목록 */}
        {isCommentsLoading ? (
          <div className="flex justify-center p-4">로딩 중...</div>
        ) : (
          <CommentList comments={commentsData?.comments || []} searchQuery={searchQuery} postId={post.id} />
        )}
      </div>
    </div>
  )
}
