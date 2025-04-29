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