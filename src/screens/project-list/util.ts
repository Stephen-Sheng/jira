import { useMemo } from "react";
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";

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

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEdittingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    projectCreate
      ? setProjectCreate({ projectCreate: "" })
      : setEdittingProjectId({ editingProjectId: "" });
  };

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
// export const useProjectModal = () => {
//   const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
//     "projectCreate",
//   ]);
//   const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
//     "editingProjectId",
//   ]);
//   const [_, setUrlParams] = useSearchParams();
//   const { data: editingProject, isLoading } = useProject(
//     Number(editingProjectId)
//   );

//   const open = () => setProjectCreate({ projectCreate: true });
//   const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
//   const startEdit = (id: number) =>
//     setEditingProjectId({ editingProjectId: id });

//   return {
//     projectModalOpen: projectCreate === "true" || Boolean(editingProject),
//     open,
//     close,
//     startEdit,
//     editingProject,
//     isLoading,
//   };
// };
