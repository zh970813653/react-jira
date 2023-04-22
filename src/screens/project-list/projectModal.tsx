import { Button, Drawer } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useProjectModal } from './util'


export const ProjectModal = () => {
  const {projectModal,close} = useProjectModal()
  return (
   <Drawer onClose={close} visible={projectModal} width={'100%'}>
    <h1>project modal</h1>
    <Button onClick={close}>关闭</Button>
   </Drawer>
  )
}
