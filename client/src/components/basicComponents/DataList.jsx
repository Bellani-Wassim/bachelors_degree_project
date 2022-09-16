import React from 'react'

export default function DataList({dataListOptions}) {
            return(
                <datalist id='datalist' className='dataList' >
                  {dataListOptions.map(dataListOptions => {
                    return(<option value={dataListOptions} key={dataListOptions}/>)
                })}
                </datalist>
              );
          }