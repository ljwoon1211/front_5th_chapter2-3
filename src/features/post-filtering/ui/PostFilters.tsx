import { Search } from "lucide-react"
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { SortOption } from "../../../entities/post/model/types"
import { Tag } from "../../../entities/tag/model/types"

const SORT_OPTIONS: SortOption[] = [
  { value: "none", label: "없음" },
  { value: "id", label: "ID" },
  { value: "title", label: "제목" },
  { value: "reactions", label: "반응" },
]

const SORT_ORDER_OPTIONS: SortOption[] = [
  { value: "asc", label: "오름차순" },
  { value: "desc", label: "내림차순" },
]

interface PostFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onSearch: () => void

  tags: Tag[]
  selectedTag: string
  onTagChange: (tag: string) => void

  sortBy: string
  onSortByChange: (value: string) => void
  sortOrder: "asc" | "desc"
  onSortOrderChange: (value: "asc" | "desc") => void

  isLoading?: boolean
}

export const PostFilters = ({
  searchQuery,
  onSearchChange,
  onSearch,
  tags = [],
  selectedTag,
  onTagChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  isLoading = false,
}: PostFiltersProps) => {
  // 엔터 키 처리
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch()
    }
  }

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {/* 검색 입력 필드 */}
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
        </div>
      </div>

      <Select value={selectedTag} onValueChange={onTagChange} disabled={isLoading}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={onSortByChange} disabled={isLoading}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortOrder} onValueChange={onSortOrderChange} disabled={isLoading || sortBy === "none"}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          {SORT_ORDER_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
