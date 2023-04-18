import React,{useState } from "react";
import List from "./List";
import {Typography} from 'antd'
import { SearchPanel } from "./SearchPanel";
import {useDebounce, useDocumentTitle} from '../../utils'
import styled from "@emotion/styled";
import { useProjects } from "../../utils/projects";
import { useUsers } from "../../utils/useUsers";
import { useUrlQueryParam } from "../../utils/url";
import { useProjectSearchParams } from "./util";

const ProjectListScreen = () => {
  // const [, setParam] = useState({
  //   name: "",
  //   personId: "",
  // });
  const [param,setParam] = useProjectSearchParams()
  const debounceParamsValue = useDebounce(param,500)
  const {data:list,isLoading,error,retry} = useProjects(debounceParamsValue)
  const {data: users} = useUsers()
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param || {}} setParam={setParam} users={users || []}></SearchPanel>
       {error ? <Typography.Text type="danger">{error?.message}</Typography.Text>:null}
      <List refresh={retry} dataSource={list || []} users={users||[]} loading={isLoading}></List>
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true
const Container = styled.div`
  padding: 3.2rem;
  width: 100%
`

export default ProjectListScreen;
