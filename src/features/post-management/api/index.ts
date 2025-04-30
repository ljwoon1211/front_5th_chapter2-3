import { Post } from "../../../entities/post/model"
import { User } from "../../../entities/user/model"

export const fetchPosts = async (limit: number, skip: number) => {
  const postsResponse = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const postsData = await postsResponse.json()

  const usersResponse = await fetch("/api/users?limit=0&select=username,image")
  const usersData = await usersResponse.json()

  const postsWithUsers = postsData.posts.map((post: Post) => ({
    ...post,
    author: usersData.users.find((user: User) => user.id === post.userId),
  }))

  return {
    posts: postsWithUsers,
    total: postsData.total,
  }
}


// 태그 가져오기
export const fetchTags = async () => {
  const response = await fetch("/api/posts/tags")
  const data = await response.json()
  return data
}

// 게시물 검색
export const searchPosts = async (searchQuery: string) => {
  if (!searchQuery) {
    // 비어있는 검색어인 경우 모든 게시물 반환 (fetchPosts 활용)
    return fetchPosts(10, 0) // 기본값 사용
  }

  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  const data = await response.json()

  // 사용자 정보 가져오기
  const usersResponse = await fetch("/api/users?limit=0&select=username,image")
  const usersData = await usersResponse.json()

  // 게시물에 사용자 정보 추가
  const postsWithUsers = data.posts.map((post: Post) => ({
    ...post,
    author: usersData.users.find((user: User) => user.id === post.userId),
  }))

  return {
    posts: postsWithUsers,
    total: data.total,
  }
}

// 태그별 게시물 가져오기
export const fetchPostsByTag = async (tag: string, limit: number, skip: number) => {
  if (!tag || tag === "all") {
    return fetchPosts(limit, skip)
  }

  const [postsResponse, usersResponse] = await Promise.all([
    fetch(`/api/posts/tag/${tag}`),
    fetch("/api/users?limit=0&select=username,image"),
  ])

  const postsData = await postsResponse.json()
  const usersData = await usersResponse.json()

  const postsWithUsers = postsData.posts.map((post: Post) => ({
    ...post,
    author: usersData.users.find((user: User) => user.id === post.userId),
  }))

  return {
    posts: postsWithUsers,
    total: postsData.total,
  }
}

// 게시물 추가
export const addPost = async (newPost: { title: string; body: string; userId: number }) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  return await response.json()
}

// 게시물 업데이트
export const updatePost = async (post: Post) => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  return await response.json()
}

// 게시물 삭제
export const deletePost = async (id: number) => {
  await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
  return id // 삭제된 게시물 ID 반환
}

// 댓글 가져오기
export const fetchComments = async (postId: number) => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()
  return data.comments
}

// 댓글 추가
export const addComment = async (newComment: { body: string; postId: number; userId: number }) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  return await response.json()
}

// 댓글 업데이트
export const updateComment = async (comment: { id: number; body: string }) => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: comment.body }),
  })
  return await response.json()
}

// 댓글 삭제
export const deleteComment = async (id: number) => {
  await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
  return id // 삭제된 댓글 ID 반환
}

// 댓글 좋아요
export const likeComment = async (id: number, currentLikes: number) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: currentLikes + 1 }),
  })
  return await response.json()
}