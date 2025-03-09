import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginUser, logoutUser, sessionStatus, registerUser } from '../services/api';

// Query keys
export const authKeys = {
  session: ['auth', 'session'],
};

// Check session status
export const useSessionQuery = () => {
  return useQuery({
    queryKey: authKeys.session,
    queryFn: () => sessionStatus().then(response => response.data),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Login mutation
export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: () => {
      // Invalidate and refetch session data
      queryClient.invalidateQueries({ queryKey: authKeys.session });
    },
  });
};

// Logout mutation
export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      // Invalidate session and clear user data
      queryClient.invalidateQueries({ queryKey: authKeys.session });
      queryClient.setQueryData(authKeys.session, null);
    },
  });
};

// Register mutation
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (userData) => registerUser(userData),
  });
};
