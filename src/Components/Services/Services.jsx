import React, { useContext } from 'react'
import { counterContext } from '../../Contexts/CounterContext'

export default function Services() {

  // const x = useContext(counterContext) ==> بعمل ديستراكتينج للداتا علطول من الاكس
  // make counterContext (export) from counterContext عشان اعرف ا اكسسه هنا
  // x ==> بيبقي متخزن فيه الداتا اللي مبعوتالي في الفاليو
  const {count , setCount} = useContext(counterContext);

  return (
    <>
        <h1>Services Component</h1>
        <h2>{count}</h2>
        <button className='btn btn-danger p-3' onClick={()=> setCount(Math.random())} >Change Number From Services</button>
    </>
    )
}
