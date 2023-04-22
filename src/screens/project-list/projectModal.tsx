import { Button, Drawer, Form, Input, Spin } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useProjectModal, useProjectsQueryKey } from './util'
import { UserSelect } from '../../components/user-select'
import { useAddProject, useEditProject } from '../../utils/projects'
import { useForm } from 'antd/lib/form/Form'
import { ErrorBox } from '../../components/lib'
import styled from '@emotion/styled'


export const ProjectModal = () => {
  const {projectModal,close,editingProject,isLoading} = useProjectModal()
  const title = editingProject ? '编辑项目':'添加项目'
  const useMutateProject = editingProject ? useEditProject : useAddProject
  const {mutateAsync,error,isLoading:mutateLoading} = useMutateProject(useProjectsQueryKey())
  const [form] = useForm()
  const onFinish = async (values: any) => {
    await mutateAsync({...editingProject,...values})
    form.resetFields()
    close()
  }

  useEffect(()=>{
    form.setFieldsValue(editingProject)
  },[form,editingProject])

  return (
   <Drawer forceRender={true} onClose={close} visible={projectModal} width={'100%'}>
    <Container>    
      {
      isLoading ? <Spin size='large'></Spin>: <>
        <h1>{title}</h1>
        <ErrorBox error={error}></ErrorBox>
        <Form form={form} layout='vertical' style={{width: '40rem'}} onFinish={onFinish}>
          <Form.Item label='名称' name='name' rules={[{required: true,message:'请输入项目名',}]}>
            <Input placeholder='请输入项目名称'></Input>
          </Form.Item>
          <Form.Item label='部门' name='organization' rules={[{required: true,message:'请输入部门名',}]}>
            <Input placeholder='请输入部门名称'></Input>
          </Form.Item>
          <Form.Item label='负责人' name='personId'>
            <UserSelect defaultOptionName='负责人' ></UserSelect>
          </Form.Item>
          <Form.Item >
            <Button loading={mutateLoading} type='primary' htmlType='submit'>提交</Button>
          </Form.Item>
        </Form>
      </>
    }
</Container>

   </Drawer>
  )
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;
`