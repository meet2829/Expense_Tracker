import React, { useContext, useEffect, useState } from 'react'
import notecontext from '../context/notecontext'

const Reports = () => {

  const [count,setcount]=useState(0)

const user=useContext(notecontext)
  useEffect(()=>{
      user.update()
  },[])

  
  return (
    <div>
    <h1>hi , i am a {user.value.name} and i work as a {user.value.designation}</h1>

    <h1>Counter:{count}</h1>
    <div >
    <button onClick={()=>setcount(count+1)} className='m-5 p-5 bg-amber-400'>ince</button>
    <button onClick={()=>setcount(count-1)} className='m-5 p-5 bg-amber-400'>desc</button>
    <button onClick={()=>setcount(0)} className='m-5 p-5 bg-amber-400'>reset</button>
    </div>

    <h1>Counter 2:{count}</h1>
    <div >
    <button onClick={()=>setcount(count+1)} className='m-5 p-5 bg-amber-400'>ince</button>
    <button onClick={()=>setcount(count-1)} className='m-5 p-5 bg-amber-400'>desc</button>
    <button onClick={()=>setcount(0)} className='m-5 p-5 bg-amber-400'>reset</button>
    </div>
    </div>
    
  )
}

export default Reports
