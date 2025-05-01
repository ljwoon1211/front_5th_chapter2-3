// import { useQuery } from "@tanstack/react-query";
// import { UserProfileOptions } from "../../../entities/user/model";
// import { fetchUserById, fetchUsers } from "../../../shared/api/users";

// export const useUsersQuery = (options: UserProfileOptions = {}) => {
//   return useQuery({
//     queryKey: ['users', options],
//     queryFn: () => fetchUsers(options),
//   });
// };

// export const useUserQuery = (id: number) => {
//   return useQuery({
//     queryKey: ['user', id],
//     queryFn: () => fetchUserById(id),
//     enabled: !!id,
//   });
// };