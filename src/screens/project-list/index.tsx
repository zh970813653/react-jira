import React from "react";
import List from "./List";
import {Typography} from 'antd'
import { SearchPanel } from "./SearchPanel";
import {useDebounce} from '../../utils'
import styled from "@emotion/styled";
import { useProjects } from "../../utils/projects";
import { useUsers } from "../../utils/useUsers";
import { useProjectSearchParams } from "./util";
import { ButtonNoPadding, Row } from "../../components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "../../store/project-list.slice";

const ProjectListScreen = () => {
  // const [, setParam] = useState({
  //   name: "",
  //   personId: "",
  // });
  const dispatch = useDispatch()
  const [param,setParam] = useProjectSearchParams()
  const debounceParamsValue = useDebounce(param,500)
  const {data:list,isLoading,error,retry} = useProjects(debounceParamsValue)
  const {data: users} = useUsers()
  return (
    <Container>
      <Row between={true }>
        <h1>项目列表</h1>
        <ButtonNoPadding type="link" onClick={()=>dispatch(projectListActions.openProjectModal())}>创建项目</ButtonNoPadding>
      </Row>
      
      <SearchPanel param={param || {}} setParam={setParam} users={users || []}></SearchPanel>
       {error ? <Typography.Text type="danger">{error?.message}</Typography.Text>:null}
      <List refresh={retry} dataSource={list || []} users={users||[]} loading={isLoading} ></List>
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true
const Container = styled.div`
  padding: 3.2rem;
  width: 100%
`

export default ProjectListScreen;
