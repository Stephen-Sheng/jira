import { Task } from "./../types/task";
import { useQuery } from "react-query";
import { useHttp } from "./http";
import { QueryKey, useMutation } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig,
} from "./use-optimistic-options";
import { useDebounce } from "utils";
import { SortProps } from "./kanban";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const debouncedParam = { ...param, name: useDebounce(param?.name, 200) };
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: debouncedParam })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderTaskConfig(queryKey));
};
