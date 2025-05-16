// Sample API service using React Query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../redux/store";
import { setStatus } from "../redux/features/counterSlice";

// Mock API functions
const fetchData = async () => {
  // Simulate API call
  return new Promise<{ data: number[] }>((resolve) => {
    setTimeout(() => {
      resolve({ data: [1, 2, 3, 4, 5] });
    }, 1000);
  });
};

const postData = async (newItem: number) => {
  // Simulate API call
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

// React Query hooks
export const useDataQuery = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      dispatch(setStatus("loading"));
      try {
        const result = await fetchData();
        dispatch(setStatus("idle"));
        return result.data;
      } catch (error) {
        dispatch(setStatus("failed"));
        throw error;
      }
    },
  });
};

export const useDataMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: postData,
    onMutate: () => {
      dispatch(setStatus("loading"));
    },
    onSuccess: () => {
      // Invalidate and refetch the data query
      queryClient.invalidateQueries({ queryKey: ["data"] });
      dispatch(setStatus("idle"));
    },
    onError: () => {
      dispatch(setStatus("failed"));
    },
  });
};
