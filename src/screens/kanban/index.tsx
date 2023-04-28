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
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";

export const KanbanScrreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskLoading } = useTasks(useTasksSearchParams());
  const isLoading = kanbanLoading || taskLoading;
  return (
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel></SearchPanel>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Drop
          type={"COLUMN"}
          direction={"horizontal"}
          droppableId={"kanban"}
        >
          <DropChild style={{ display: "flex" }}>
            {kanbans?.map((kanban, index) => (
              <Drag
                key={kanban.id}
                draggableId={"kanban" + kanban.id}
                index={index}
              >
                <KanbanColumn kanban={kanban} key={kanban.id} />
              </Drag>
            ))}
          </DropChild>
        </Drop>
        )}
        <TaskModal></TaskModal>
      </ScreenContainer>
    </DragDropContext>
  );
};

const ColumnsContainer = styled(DropChild)`
  display: flex;
  overflow-x: scroll;
  margin-right: 2rem;
  height: 100%;
`;
