import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 50]

interface PostPaginationProps {
  total: number
  skip: number
  limit: number
  onSkipChange: (skip: number) => void
  onLimitChange: (limit: number) => void
  isLoading?: boolean
}

export const PostPagination = ({
  total,
  skip,
  limit,
  onSkipChange,
  onLimitChange,
  isLoading = false,
}: PostPaginationProps) => {
  const handlePrevPage = () => {
    onSkipChange(Math.max(0, skip - limit))
  }

  const handleNextPage = () => {
    onSkipChange(skip + limit)
  }

  return (
    <div className="flex justify-between items-center mt-4">
      {/* 페이지 당 항목 수 선택 */}
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => onLimitChange(Number(value))} disabled={isLoading}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            {ITEMS_PER_PAGE_OPTIONS.map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>

      {/* 이전/다음 페이지 버튼 */}
      <div className="flex gap-2">
        <Button disabled={skip === 0 || isLoading} onClick={handlePrevPage}>
          이전
        </Button>
        <Button disabled={skip + limit >= total || isLoading} onClick={handleNextPage}>
          다음
        </Button>
      </div>
    </div>
  )
}
