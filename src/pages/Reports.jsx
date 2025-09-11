import React, { useContext, useEffect } from 'react'
import notecontext from '../context/notecontext'

const Reports = () => {

const user=useContext(notecontext)
  useEffect(()=>{
      user.update()
  },[])
  
  return (
    <div>
    <h1>hi , i am a {user.value.name} and i work as a {user.value.designation}</h1>
    </div>
  )
}

export default Reports
