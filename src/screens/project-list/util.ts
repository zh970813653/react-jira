import { useMemo, useState } from "react";
import { useSetUrlSearchParams, useUrlQueryParam } from "../../utils/url";
import { useProject } from "../../utils/projects";
import { useSearchParams } from "react-router-dom";

export const useProjectSearchParams = () => {
  const [params] = useState(["name", "personId"])
  const [param, setParam] = useUrlQueryParam(params);
  return [
    useMemo(()=>(
        { 
            ...param, 
            personId: Number(param.personId) || undefined 
        }
    ),[param]),
    setParam
] as const
};

export const useProjectsQueryKey = () => {
    const [params] = useProjectSearchParams()
    return ["projects", params]
}

export const useProjectModal = () => {
    const [{projectCreate},setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])
    const [{editingProjectId},setEditingProjectId] = useUrlQueryParam([
        'editingProjectId'
    ])
    const setUrlSearchParams = useSetUrlSearchParams()
    // const [_, setUrlParams] = useSearchParams();
    const {data: editingProject,isLoading} = useProject(Number(editingProjectId))
    const open = () => setProjectCreate({projectCreate: true})
    const close = () => {
        setUrlSearchParams({
            projectCreate: '',
            editingProjectId: ''
        })
        // setProjectCreate({projectCreate: false})
        // setEditingProjectId({editingProjectId: undefined})
    }
    const startEdit = (editingProjectId: number) => setEditingProjectId({editingProjectId})
    return {
        projectModal: projectCreate === 'true' || Boolean(editingProjectId),
        editingProject,
        isLoading,
        open,
        close,
        startEdit
    }
}