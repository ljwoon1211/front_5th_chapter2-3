import { useQuery } from "@tanstack/react-query";
import { fetchCommentsByPostId } from "../../../shared/api/comments";

export const useCommentsQuery = (postId: number) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchCommentsByPostId(postId),
    enabled: !!postId,
  });
};