import React, { useContext, useEffect, useMemo, useState } from 'react'
import notecontext from '../context/notecontext'


const Reports = () => {

  function heavyComputation(n) {
    console.log("heavyComputation running for", n);
    let result = 0;
    for (let i = 0; i < 200_000_000; i++) { result += i % (n + 1); }
    return result;
  }

  const [number, setNumber] = useState(10);
  const [show, setShow] = useState(false);

  const computed = useMemo(() => heavyComputation(number), [number]);

  console.log("Parent rendered");

  const user = useContext(notecontext)
  useEffect(() => {
    user.update()
  }, [])

  return (
    <div>
      <h1>hi , i am a {user.value.name} and i work as a {user.value.designation}</h1>
      <h2>useMemo example</h2>
      <div>Number: {number}</div>
      <div>Computed result: {computed}</div>
      <button onClick={() => setNumber(n => n + 1)}>Increase number</button>
      <button onClick={() => setShow(s => !s)}>
        Toggle unrelated UI (show: {String(show)})
      </button>
    </div>
  )
}
export default Reports