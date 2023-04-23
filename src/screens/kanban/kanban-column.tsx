import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import React from "react";
import { useTasksSearchParams } from "./util";
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams()); // react-query默认帮我们设置了时间 ，默认2s内 重复请求不会发送http请求 用缓存的数据
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <div>
        <h3>{kanban.name}</h3>
      {tasks?.map((task) => {
        return <div> {task.name}</div>;
      })}
    </div>
  );
};
