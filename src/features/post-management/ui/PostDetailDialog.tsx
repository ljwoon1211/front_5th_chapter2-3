import { Plus } from "lucide-react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { usePostFilterUIStore } from "../../post-filtering/model/post-filter-ui-store"
import { useModalStore } from "../../ui/model/model-store"

export const PostDetailDialog = () => {
  // 모달 상태 관리
  const { isPostDetailDialogOpen, closePostDetailDialog, selectedPost, openCommentAddDialog } = useModalStore()

  const { search: searchQuery } = usePostFilterUIStore()

  // const { data: commentsData, isLoading: isCommentsLoading } = useCommentsQuery(
  //   selectedPost?.id || 0
  // );

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

  if (!selectedPost) return null

  return (
    <Dialog open={isPostDetailDialogOpen} onOpenChange={closePostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{highlightText(selectedPost.body, searchQuery)}</p>
          </div>

          {selectedPost.author && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <img
                src={selectedPost.author.image}
                alt={selectedPost.author.username}
                className="w-6 h-6 rounded-full"
              />
              <span>작성자: {selectedPost.author.username}</span>
            </div>
          )}

          {/* 댓글 섹션 */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">댓글</h3>
              <Button size="sm" onClick={() => openCommentAddDialog(selectedPost.id)}>
                <Plus className="w-4 h-4 mr-1" />
                댓글 추가
              </Button>
            </div>

            {/* 댓글 목록 */}
            {/* {isCommentsLoading ? (
              <div className="text-center py-4">댓글을 불러오는 중...</div>
            ) : (
              <CommentList 
                comments={commentsData?.comments || []} 
                searchQuery={searchQuery}
                postId={selectedPost.id}
              />
            )} */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
