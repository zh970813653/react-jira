import React from 'react'
import {Navigate,Route, Routes} from 'react-router'
import { Link } from 'react-router-dom'
import { KanbanScrreen } from '../kanban'
import { EpicScrreen } from '../epic'

export const ProjectScreen = () => {
  return (
    <div>
      <Link to={'kanban'}>任务看板</Link>
      <Link to={'epic'}>epic</Link>
      <Routes>
        <Route path='/kanban' element={<KanbanScrreen />}></Route>
        <Route path='/epic' element={<EpicScrreen />}></Route>
        <Route index element={  <Navigate to={'kanban'} replace={true} />}></Route>
      </Routes>
    </div>
  )
}
