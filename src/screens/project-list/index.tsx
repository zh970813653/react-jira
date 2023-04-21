import React,{useState } from "react";
import List from "./List";
import {Button, Typography} from 'antd'
import { SearchPanel } from "./SearchPanel";
import {useDebounce} from '../../utils'
import styled from "@emotion/styled";
import { useProjects } from "../../utils/projects";
import { useUsers } from "../../utils/useUsers";
import { useProjectSearchParams } from "./util";
import { Row } from "../../components/lib";

const ProjectListScreen = (props: {
  projectButton: JSX.Element
}) => {
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
      <Row between={true }>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      
      <SearchPanel param={param || {}} setParam={setParam} users={users || []}></SearchPanel>
       {error ? <Typography.Text type="danger">{error?.message}</Typography.Text>:null}
      <List refresh={retry} dataSource={list || []} users={users||[]} loading={isLoading} projectButton={props.projectButton}></List>
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true
const Container = styled.div`
  padding: 3.2rem;
  width: 100%
`

export default ProjectListScreen;
