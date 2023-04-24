import { Form, Input, Select } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { UserSelect } from "../../components/user-select";
import { Project } from "../../types/project";


export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project,'name' | 'personId'>>
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  const handlerChangeName = (evt: any) => {
    setParam({
      ...param,
      name: evt.target.value,
    });
  };
  const handleChangePersonId = (value: any) => {
    setParam({
      ...param,
      personId: value,
    });
  };
  return (
    <Form style={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          onChange={handlerChangeName}
          style={{ width: "200px" }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect value={param.personId} onChange={handleChangePersonId} defaultOptionName="负责人"></UserSelect>
      </Form.Item>
    </Form>
  );
};
