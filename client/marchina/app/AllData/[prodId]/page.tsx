import React from 'react'

export default function prodDetail({params}:{params:{prodId:string}}) {
  return (
    <div>page
        {params.prodId}
    </div>
  )
}
