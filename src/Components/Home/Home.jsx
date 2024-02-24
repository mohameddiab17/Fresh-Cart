import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import Product from '../Product/Product';
import MainSlider from '../MainSlider/MainSlider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';




export default function Home() {

  const [products , setProducts] = useState([])




    async function getAllProducts(){
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    setProducts(data.data);
  }





  useEffect(()=>{
    getAllProducts();
  } , [])


  return (
    <>
    <header>
      <MainSlider/>
      <CategoriesSlider/>
    </header>
    <div className="row">
    <h1 className='text-center pt-5 fw-bold'>All Products</h1>
      { products.map((product)=>{
        return <div className="col-md-3" key={product.id}>
        <Product product={product}/>
      </div>
      }) }
    </div>
    </>
  )
}
