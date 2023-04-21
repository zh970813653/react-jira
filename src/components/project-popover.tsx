import { Button, Divider, List, Popover, Typography } from 'antd'
import React from 'react'
import { useProjects } from '../utils/projects'
import styled from '@emotion/styled'
import { ButtonNoPadding } from './lib'

export const ProjectPopover = (props: {
    projectButton: JSX.Element
}) => {
    const {isLoading,data:projects} = useProjects()
    // 筛选出所有的收藏项目
    const pinnedProjects = projects?.filter(project => project.pin)
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
                 {props.projectButton}
            </ContentContainer>
        ) 
    }
  return (
    <Popover placement='bottom' content={content()}> 
        项目
    </Popover>
  )
}

const ContentContainer = styled.div`
    min-width: 30rem
`