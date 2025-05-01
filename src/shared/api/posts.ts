// import { EditablePost, NewPost, Post, PostFilterParams, PostsResponse } from "../../entities/post/model/types";
// import { Tag } from "../../entities/tag/model/types";
// import { api } from "./base";



// export const fetchPosts = async (
//   params: Partial<PostFilterParams> = {}
// ): Promise<PostsResponse> => {
//   const { limit = 10, skip = 0 } = params;
//   const queryString = new URLSearchParams({
//     limit: limit.toString(),
//     skip: skip.toString()
//   }).toString();

//   return api.get<PostsResponse>(`/posts?${queryString}`);
// };

// export const searchPosts = async (
//   query: string
// ): Promise<PostsResponse> => {
//   if (!query.trim()) {
//     return fetchPosts();
//   }
//   return api.get<PostsResponse>(`/posts/search?q=${encodeURIComponent(query)}`);
// };

// export const fetchPostsByTag = async (
//   tag: string,
//   params: Partial<PostFilterParams> = {}
// ): Promise<PostsResponse> => {
//   if (!tag || tag === 'all') {
//     return fetchPosts(params);
//   }
//   return api.get<PostsResponse>(`/posts/tag/${encodeURIComponent(tag)}`);
// };

// export const fetchPostById = async (
//   id: number
// ): Promise<Post> => {
//   return api.get<Post>(`/posts/${id}`);
// };

// export const fetchTags = async (): Promise<Tag[]> => {
//   return api.get<Tag[]>('/posts/tags');
// };

// export const addPost = async (
//   newPost: NewPost
// ): Promise<Post> => {
//   return api.post<Post>('/posts/add', newPost);
// };

// export const updatePost = async (
//   post: EditablePost
// ): Promise<Post> => {
//   return api.put<Post>(`/posts/${post.id}`, post);
// };

// export const deletePost = async (
//   id: number
// ): Promise<void> => {
//   return api.delete<void>(`/posts/${id}`);
// };