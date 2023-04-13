import React from "react";
import { User } from "./SearchPanel";
import { Table } from "antd";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

const List = ({ list, users }: ListProps) => {
  return <Table pagination={false} columns={
    [
      {
        title: '名称',
        dataIndex:'name',
        sorter: (a,b) =>a.name.localeCompare(b.name)
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
      }
    ]
  } dataSource={list}></Table>;
};

export default List;
