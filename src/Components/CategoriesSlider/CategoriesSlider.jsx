import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";


export default function CategoriesSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows : false,
    }

    const [categories , setCategories] = useState([])

    async function getAllCategories() {
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setCategories(data.data)
    }

    useEffect(()=>{
        getAllCategories()
    } , [])

  return (
    <>
    <h1 className='text-center p-3 fw-bold'>Categories</h1>
    <Slider {...settings} >
        { categories.map((category , index)=>{
            return <div key={index}>
            <img style={{height:'220px'}} src={category.image} className='w-100' alt="" />
            <h5>{category.name}</h5>
            </div>
        })}
    </Slider>
    </>
  )
}
