import { Input, Select } from "antd"
import React from "react"
import { useEffect, useState } from "react"

export interface User {
  id: string
  name: string
  email: string
  title: string
  organization: string
  token: string
}

interface SearchPanelProps {
  users: User[],
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({param,setParam,users}:SearchPanelProps) => {

  const handlerChangeName = (evt:any) => {
    setParam({
      ...param,
      name: evt.target.value
    })
  }
  const handleChangePersonId = (value:any) => { 
    setParam({
      ...param,
      personId: value
    })
  }
  return (
    <form action="">
      <div>
        <Input type="text" value={param.name} onChange={handlerChangeName} style={{width:"130px"}} />
        <Select value={param.personId} onChange={handleChangePersonId} >
          <Select.Option value="">负责人</Select.Option>
          {
            users.map((user:any)=> {
              return (
                <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>
              )
            })
          }
        </Select>
      </div>
    </form>
  )
}

