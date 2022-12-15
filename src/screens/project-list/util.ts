import { useMemo } from "react";
import { useProject } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(
    useMemo(() => ["name", "personId"], [])
  );
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ["projects", params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEdittingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const setUrlParams = useSetUrlSearchParam();
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const startEdit = (id: number) =>
    setEdittingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
