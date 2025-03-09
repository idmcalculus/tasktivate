import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/api';

// Query keys
export const userKeys = {
  all: ['users'],
  lists: () => [...userKeys.all, 'list'],
  list: (filters) => [...userKeys.lists(), { ...filters }],
};

// Fetch users with search functionality
export const useUsersQuery = (searchTerm = '') => {
  return useQuery({
    queryKey: userKeys.list({ searchTerm }),
    queryFn: () => getUsers(searchTerm).then(response => response.data),
    enabled: searchTerm !== undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook for loading user options in AsyncSelect component
export const useUserOptions = () => {
  return async (inputValue) => {
    const response = await getUsers(inputValue);
    
    return response.data.map(user => ({
      value: user.id,
      label: `${user.username} (${user.email})`,
      id: user.id,
    }));
  };
};
