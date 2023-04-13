import { useEffect, useState } from "react";
import { SearchPanel } from "./SearchPanel";
import {cleanObject, paramsToString, useDebounce} from '../../utils'
import List from "./List";
import React from "react";
import { useHttp } from "../../utils/http";

const apiUrl = process.env.REACT_APP_API_URL

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParamsValue = useDebounce(param,500)
  const [users,setUsers] = useState([])
  const [list, setList] = useState([]);
  const http = useHttp()
  useEffect(() => {
    http('projects',{data:cleanObject(debounceParamsValue)}).then(setList)

  }, [debounceParamsValue]);
  useEffect(() => {
    http('users').then(setUsers)

  }, []);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};

export default ProjectListScreen;
