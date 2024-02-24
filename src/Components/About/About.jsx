import React, { useContext } from 'react'
import { counterContext } from '../../Contexts/CounterContext'

export default function About() {

  // const {count , setCount} = useContext(counterContext);

  return (
    <>
    <h1>About Component</h1>
    {/* <h2>{count}</h2>
    <button className='btn btn-danger p-3' onClick={()=> setCount(Math.random())} >Change Number From About</button> */}
    </>
  )
}
