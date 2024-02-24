import React from 'react'
import notFoundImg from '../../Assets/SVGs/error.svg'

export default function NotFound() {
  return (
    <>
    <div className=" my-5 ">
        <img className='w-50 py-5 mx-auto d-block ' src={notFoundImg} alt="NoFound" />
    </div>
    </>
  )
}
