import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils";

export const useFetchTasks = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => customFetch().get("/"),
  });

  return { isLoading, isError, data };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTasks, isPending } = useMutation({
    mutationFn: (taskTitle) =>
      customFetch().post("/", {
        title: taskTitle,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { createTasks, createTaskPending: isPending };
};

export const useEditTask = () => {
  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) =>
      customFetch().patch(`/${taskId}`, {
        isDone,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { editTask };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: (taskId) => {
      customFetch().delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { deleteTask, deleteTaskLoading: isPending };
};
