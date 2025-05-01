// import { useQuery } from '@tanstack/react-query';
// import { fetchPosts, fetchPostById, fetchPostsByTag, fetchTags, searchPosts } from '../../../shared/api/posts';
// import { Post, PostFilterParams, PostsResponse } from '../../../entities/post/model';
// import { User } from '../../../entities/user/model';
// import { fetchUsers } from '../../../shared/api/users';

// export const usePostsQuery = (params: Partial<PostFilterParams> = {},
//   options?: { enabled?: boolean }
// ) => {
//   const postsQuery = useQuery({
//     queryKey: ['posts', params],
//     queryFn: () => fetchPosts(params),
//     enabled: options?.enabled !== false,
//   });

//   const usersQuery = useQuery({
//     queryKey: ['users'],
//     queryFn: () => fetchUsers({ select: 'username,image' }),
//     enabled: postsQuery.isSuccess,
//   });

//   const enhancedData = getEnhancedPostsData(postsQuery.data, usersQuery.data);

//   return {
//     ...postsQuery,
//     data: enhancedData,
//     isLoading: postsQuery.isLoading || usersQuery.isLoading,
//   };
// };

// export const useSearchPostsQuery = (searchQuery: string, options?: { enabled?: boolean }) => {
//   const postsQuery = useQuery({
//     queryKey: ['posts', 'search', searchQuery],
//     queryFn: () => searchPosts(searchQuery),
//     enabled: !!searchQuery && options?.enabled !== false,
//   });

//   const usersQuery = useQuery({
//     queryKey: ['users'],
//     queryFn: () => fetchUsers({ select: 'username,image' }),
//     enabled: postsQuery.isSuccess,
//   });

//   const enhancedData = getEnhancedPostsData(postsQuery.data, usersQuery.data);

//   return {
//     ...postsQuery,
//     data: enhancedData,
//     isLoading: postsQuery.isLoading || usersQuery.isLoading,
//   };
// };


// export const usePostsByTagQuery = (tag: string, params: Partial<PostFilterParams> = {},
//   options?: { enabled?: boolean }) => {
//   const postsQuery = useQuery({
//     queryKey: ['posts', 'tag', tag, params],
//     queryFn: () => fetchPostsByTag(tag, params),
//     enabled: !!tag && options?.enabled !== false,
//   });

//   const usersQuery = useQuery({
//     queryKey: ['users'],
//     queryFn: () => fetchUsers({ select: 'username,image' }),
//     enabled: postsQuery.isSuccess,
//   });

//   const enhancedData = getEnhancedPostsData(postsQuery.data, usersQuery.data);

//   return {
//     ...postsQuery,
//     data: enhancedData,
//     isLoading: postsQuery.isLoading || usersQuery.isLoading,
//   };
// };


// export const usePostQuery = (id: number) => {
//   return useQuery({
//     queryKey: ['post', id],
//     queryFn: () => fetchPostById(id),
//     enabled: !!id,
//   });
// };


// export const useTagsQuery = () => {
//   return useQuery({
//     queryKey: ['tags'],
//     queryFn: fetchTags,
//   });
// };


// function getEnhancedPostsData(
//   postsData?: PostsResponse,
//   usersData?: { users: User[] }
// ): PostsResponse | undefined {
//   if (!postsData || !usersData) {
//     return postsData;
//   }

//   const enhancedPosts = postsData.posts.map((post: Post) => ({
//     ...post,
//     author: usersData.users.find((user) => user.id === post.userId),
//   }));

//   return {
//     ...postsData,
//     posts: enhancedPosts,
//   };
// }