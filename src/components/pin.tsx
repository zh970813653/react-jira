import { Rate } from 'antd'
import React from 'react'

interface PinProps extends React.ComponentProps<typeof Rate> {
    checked: boolean
    onCheckedChange?: (check: boolean) => void
}

export const Pin = ({checked,onCheckedChange,...restProps}: PinProps) => {
    const handleCheckedChange = (num: number) => {
        onCheckedChange?. (!!num)
    }
  return (
    <Rate count={1} value={checked ? 1 : 0} onChange={handleCheckedChange} {...restProps}></Rate>
  )
}
