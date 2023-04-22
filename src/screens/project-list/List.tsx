import React from "react";
import { User } from "./SearchPanel";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useDeleteProject, useEditProject } from "../../utils/projects";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal, useProjectsQueryKey } from "./util";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number

}

interface ListProps extends TableProps<Project> {
  users: User[];
}

const List = ({ users, ...props}: ListProps) => {
  const {mutate} = useEditProject(useProjectsQueryKey())
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin})

  return <Table pagination={false} rowKey="id" columns={
    [
      {
        title: <Pin checked={true} disabled={true}></Pin>,
        render(value,project) {
          return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}></Pin>
        }
      },
      {
        title: '名称',
        sorter: (a,b) =>a.name.localeCompare(b.name),
        render(value,project){
          return <Link to={String(project.id)}>{project.name}</Link>
        }
      },
      {
        title: '部门',
        dataIndex:'organization'
      },
      {
        title: '负责人',
        render(value,project){
          return (
            <span key={project.id}>
              {users.find((user) => user.id === project.personId)?.name || '负责人'}
            </span>
          )
        }
      },
      {
        title: '创建时间',
        render(value,project){
          return (
            <span key={project.id}>
              {project.created? dayjs(project.created).format('YYYY-MM-DD'):''}
            </span>
          )
        }
      },
      {
        render(value,project) {
          return (
            <More project={project}></More>
          )
        }
      }
    ]
  } {...props}></Table>;
};

const More = ({project}: {project: Project}) =>  {
  const {startEdit} = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const {mutateAsync:deleteProject}  = useDeleteProject(useProjectsQueryKey())
  const confirmDeleteProject = (id: number) => {

    Modal.confirm({
      title: '确定删除这个项目吗?',
      content: '点击确定删除',
      okText: '确定',
      onOk : async () => {
        await deleteProject({id})
      }

    })
  }
  return (
    <Dropdown overlay={
      <Menu>
        <Menu.Item key='edit' onClick={editProject(project.id)} >编辑</Menu.Item>
        <Menu.Item key='delete' onClick={() => confirmDeleteProject(project.id)}>删除</Menu.Item>
      </Menu>
    }>
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  )
}

export default List;
