'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
 const AllData= () =>{
  const router = useRouter()
  return (
    <div>
        
    <h1 onClick={()=> router.push('/AllData/1')}>prod 1</h1>
    <h1 onClick={()=> router.push('/AllData/2')}>prod2</h1>
    </div>
  )
}
export default AllData