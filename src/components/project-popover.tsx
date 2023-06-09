import { Button, Divider, List, Popover, Typography } from 'antd'
import React from 'react'
import { useProjects } from '../utils/projects'
import styled from '@emotion/styled'
import { ButtonNoPadding } from './lib'
import { useProjectModal } from '../screens/project-list/util'

export const ProjectPopover = () => {
    const {data:projects,refetch} = useProjects()
    // 筛选出所有的收藏项目
    const pinnedProjects = projects?.filter(project => project.pin)
    const {open} = useProjectModal()
    const content = ()=> {
        return (
            <ContentContainer>
                 <Typography.Text type="secondary">收藏项目</Typography.Text>
                 <List>
                    {
                        pinnedProjects?.map(project => (
                            <List.Item key={project.id}>
                                <List.Item.Meta title={project.name} />
                            </List.Item>
                        ))
                    }
                 </List>
                 <Divider />
                 <ButtonNoPadding onClick={open} type='link'>创建项目</ButtonNoPadding>
            </ContentContainer>
        ) 
    }
  return (
    <Popover onVisibleChange={() => refetch()} placement='bottom' content={content()}> 
        项目
    </Popover>
  )
}

const ContentContainer = styled.div`
    min-width: 30rem
`