import React, { useState } from 'react'
import { useArray } from '../utils'

export const TsReactTest = () => {
    const persons: {name: string, age: number}[] = [
        {
            name: 'zhangsan1',
            age: 12
        },
        {
            name: 'zhangsan2',
            age: 13
        }
    ]
    const {value,add,removeIndex,clear} = useArray(persons)
  return (
    <div>
        <button onClick={()=>add({name:'zhangsan',age:22})}>add joib</button>
        <button onClick={()=>removeIndex(0)}>remove joib</button>

        {value.map((person,index) => (
            <div style={{marginBottom:'30px'}} key={index+1}>
                <span>{index}</span>&nbsp;&nbsp;
                <span>{person.name}</span>&nbsp;&nbsp;
                <span>{person.age}</span>&nbsp;&nbsp;
            </div>
        ))}
    </div>
  )
}
