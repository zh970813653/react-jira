import React from "react";
import { useDocumentTitle } from "../../utils";
import { useKanbanSearchParams, useProjectInUrl } from "./util";
import { useKanbans } from "../../utils/kanban";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";

export const KanbanScrreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel></SearchPanel>
      <ColumnsContainer>
        {kanbans?.map((kanban) => {
          return <KanbanColumn key={kanban.id} kanban={kanban} />;
        })}
      </ColumnsContainer>
    </div>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
