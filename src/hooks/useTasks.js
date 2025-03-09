import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../services/api';

// Query keys
export const taskKeys = {
  all: ['tasks'],
  lists: () => [...taskKeys.all, 'list'],
  list: (filters) => [...taskKeys.lists(), { ...filters }],
  details: () => [...taskKeys.all, 'detail'],
  detail: (id) => [...taskKeys.details(), id],
};

// Fetch tasks with pagination, search, and filters
export const useTasksQuery = (token, searchTerm = '', statusFilter = '', priorityFilter = '') => {
  return useInfiniteQuery({
    queryKey: taskKeys.list({ searchTerm, statusFilter, priorityFilter }),
    queryFn: ({ pageParam = 1 }) => 
      getTasks(token, pageParam, searchTerm, statusFilter, priorityFilter)
        .then(response => response.data),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    enabled: !!token,
  });
};

// Fetch a single task by ID
export const useTaskQuery = (token, taskId) => {
  return useQuery({
    queryKey: taskKeys.detail(taskId),
    queryFn: () => getTask(token, taskId).then(response => response.data),
    enabled: !!token && !!taskId,
  });
};

// Create a new task
export const useCreateTaskMutation = (token) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (taskData) => createTask(token, taskData),
    onSuccess: () => {
      // Invalidate and refetch tasks list
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};

// Update an existing task
export const useUpdateTaskMutation = (token) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ taskId, updatedData }) => updateTask(token, taskId, updatedData),
    onSuccess: (_, variables) => {
      // Invalidate and refetch the specific task and the tasks list
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(variables.taskId) });
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};

// Delete a task
export const useDeleteTaskMutation = (token) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (taskId) => deleteTask(token, taskId),
    onSuccess: (_, taskId) => {
      // Invalidate and refetch tasks list
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      
      // Optimistic UI update - remove the task from the cache
      queryClient.setQueryData(
        taskKeys.lists(),
        (oldData) => {
          if (!oldData) return oldData;
          
          return {
            ...oldData,
            pages: oldData.pages.map(page => ({
              ...page,
              tasks: page.tasks.filter(task => task.id !== taskId)
            }))
          };
        }
      );
    },
  });
};
