import { api } from '../../../shared/api/base';
import { User, UsersResponse, UserProfileOptions } from '../model/types';

export const fetchUsers = async (
  options: UserProfileOptions = {}
): Promise<UsersResponse> => {
  const params = new URLSearchParams();
  params.set('limit', '0');

  if (options.select) {
    params.set('select', options.select);
  }

  return api.get<UsersResponse>(`/users?${params.toString()}`);
};

export const fetchUserById = async (
  id: number
): Promise<User> => {
  return api.get<User>(`/users/${id}`);
};
