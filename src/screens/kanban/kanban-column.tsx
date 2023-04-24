import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import React from "react";
import { useTasksSearchParams } from "./util";
import { useTaskTypes } from "../../utils/task-type";
import taskIcon from "../../assets/task.svg";
import bugIcon from "../../assets/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";
import { CreateTask } from "./create-task";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img src={name === "task" ? taskIcon : bugIcon} alt=""></img>;
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams()); // react-query默认帮我们设置了时间 ，默认2s内 重复请求不会发送http请求 用缓存的数据
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container>
      <TasksContainer>
      <h3>{kanban.name}</h3>
      {tasks?.map((task) => {
        return (
          <Card key={task.id} style={{marginBottom:'0.5rem'}}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        );
      })}
      <CreateTask kanbanId={kanban.id}></CreateTask>
      </TasksContainer>
    </Container>
  );
};


export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
