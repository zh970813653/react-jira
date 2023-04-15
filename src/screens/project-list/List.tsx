import React from "react";
import { User } from "./SearchPanel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number

}

interface ListProps extends TableProps<Project> {
  users: User[];
}

const List = ({ users, ...props}: ListProps) => {
  return <Table pagination={false} rowKey="id" columns={
    [
      {
        title: '名称',
        dataIndex:'name',
        sorter: (a,b) =>a.name.localeCompare(b.name)
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
              {users.find((user) => user.id === project.personId)?.name}
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
      }
    ]
  } {...props}></Table>;
};

export default List;
