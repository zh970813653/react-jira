import { useLocation } from "react-router-dom"
import { useProject } from "../../utils/projects";
import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

export const useProjectIdInUrl = () => {
    const {pathname} = useLocation()
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}


export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({projectId:useProjectIdInUrl()})
export const useKanbansQueryKey = () => ['kanbans',useKanbanSearchParams()]


export const useTasksSearchParams = () => {
    const [param,setParam] = useUrlQueryParam([
        'name', // 名字
        'typeId', // 用来搜索是task还是bug
        'processorId', // 负责人
        'tagId' // tag
    ])
    const projectId = useProjectIdInUrl()
    return useMemo(
        ()=> ({
            projectId,
            name: param.name,
            typeId: Number(param.typeId) || undefined,
            processorId: Number(param.processorId) || undefined,
            tagId: Number(param.tagId) || undefined,
        }),
        [projectId,param]
    )
}
export const useTasksQueryKey = () => ['tasks',useTasksSearchParams()]
