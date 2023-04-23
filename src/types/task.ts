export interface Task {
    id: number
    name: string
    processorId: number // 经办人
    projectId: number // 项目id
    epicId: number // 任务组     
    kanbanId: number 
    typeId: number // bug or taskCancelled
    note: string

}