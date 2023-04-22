import React, { ReactNode, useState } from "react";
import ProjectListScreen from "./screens/project-list";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg"; // svg
import { Auth, useAuth } from "./context/auth-content";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "./components/lib";
import { Button, Dropdown, Menu } from "antd";
import { resetRoute, useDocumentTitle } from "./utils";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { ProjectScreen } from "./screens/project";
import { ProjectPopover } from "./components/project-popover";
import { useProjectModal } from "./screens/project-list/util";
import { ProjectModal } from "./screens/project-list/projectModal";
// import { useDocumentTitle } from "./utils";

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

export const AuthenticatedApp = () => {
  useDocumentTitle("项目列表", false);
  // const [projectModalOpen,setProjectModalOpen  ] = useState(false)
  return (
    <Container>
      <PageHeader></PageHeader>
      <Main>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen />}></Route>
            <Route
              path={'/projects/:prujectId/*'}
              element={<ProjectScreen />}
            ></Route>
             <Route path="/" element={<Navigate to="/projects" />} />
            {/* <Route index  element={<ProjectListScreen />} /> */}
          </Routes>
      </Main>
      <ProjectModal></ProjectModal>
    </Container>
  );
};

const PageHeader = () => {
  const {open} = useProjectModal()
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
            <SoftwareLogo width={"18rem "} color={"rga(38,132,255)"} />
        </ButtonNoPadding>
        <ProjectPopover></ProjectPopover>
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User></User>
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  let { logout, user } = useAuth() as Auth;
  return (
    <Dropdown
    overlay={
      <Menu>
        <Menu.Item key={"logout"}>
          <Button onClick={logout} type="link">
            登出
          </Button>
        </Menu.Item>
      </Menu>
    }
  >
    <Button onClick={(e) => e.preventDefault()} type="link">
      Hi, {user?.name}
    </Button>
  </Dropdown>
  )
}


// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
  /* width: 100%; */
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)`
* > span:hover {
  cursor: pointer;
}
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  display: flex;
  /* width: 100%; */
  overflow: hidden;
`;
