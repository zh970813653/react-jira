import React from 'react'
import {Navigate,Route, Routes} from 'react-router'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { KanbanScrreen } from '../kanban'
import { ScreenContainer } from '../../components/lib'
import styled from '@emotion/styled'
import { Menu } from 'antd'
import { EpicScreen } from '../epic'

const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length-1]
}

export const ProjectScreen = () => {
  let routeType = useRouteType()
  return (
    <Container>
      <Aside>
        <Menu mode='inline' selectedKeys={[routeType]}>
          <Menu.Item key='kanban'>
              <Link to={'kanban'}>任务看板</Link>
          </Menu.Item>
          <Menu.Item key='epic'>
              <Link to={'epic'}>epic</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path='/kanban' element={<KanbanScrreen />}></Route>
          <Route path='/epic' element={<EpicScreen />}></Route>
          <Route index element={  <Navigate to={'kanban'} replace={true} />}></Route>
        </Routes>
      </Main>

    </Container>
  )
}
const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;
