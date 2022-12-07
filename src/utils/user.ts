import { User } from "screens/project-list/search-panel";
import { useHttp } from "./http";
import { cleanObject } from "utils";
import { useEffect } from "react";
import { useAsync } from "./use-async";
export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
