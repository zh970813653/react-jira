import { Button, Drawer } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { projectListActions, selectProjectModalOpen } from '../../store/project-list.slice'


export const ProjectModal = () => {
  const dispatch = useDispatch()
  const projectModalOpen = useSelector(selectProjectModalOpen)
  const handlerClose = () => {
    dispatch(projectListActions.closeProjectModal())
  }
  return (
   <Drawer onClose={handlerClose} visible={projectModalOpen} width={'100%'}>
    <h1>project modal</h1>
    <Button onClick={handlerClose}>关闭</Button>
   </Drawer>
  )
}
