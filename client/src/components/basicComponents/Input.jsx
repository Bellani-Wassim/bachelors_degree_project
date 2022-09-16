import React from 'react'
import DataList from './DataList'

export default function Input({dataListOptions, id, children, ...props }) {
  return (
    <div className="input">
      <label htmlFor={id}>{children}</label>
      <input id={id} type="text" {...props}>
      </input>
      {dataListOptions&&<DataList dataListOptions={dataListOptions}/>}
    </div>
  )
}
