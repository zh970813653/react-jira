import React from "react";
import { useDocumentTitle } from "../../utils";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";
import { useKanbans } from "../../utils/kanban";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";
import { useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";

export const KanbanScrreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskLoading } = useTasks(useTasksSearchParams());
  const isLoading = kanbanLoading || taskLoading;
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel></SearchPanel>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban) => {
            return <KanbanColumn key={kanban.id} kanban={kanban} />;
          })} 
          <CreateKanban></CreateKanban>
        </ColumnsContainer>
      )}
      <TaskModal></TaskModal>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-right: 2rem;
  height: 100%;
`;
