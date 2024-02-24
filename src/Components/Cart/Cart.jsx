import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartProduct from '../CartProduct/CartProduct';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Cart() {




  const [cart , setCart] = useState({});
  const [isLoading , setIsloading] = useState(false);
  const [timeOutId , setTimeOutId] = useState()
  const [cartId , setCartId] = useState()





  async function getLoggedUserCart() {
    try {
      setIsloading(true)
      let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers : {
        token : localStorage.getItem('token')
      }
    })
    setCartId(data.data._id)
    setCart(data);
    } catch (error) {
      console.log(error);
    }
    setIsloading(false)
  }





  function removeProductFromCart(productId){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success m-2",
        cancelButton: "btn btn-danger m-2"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(  async(result) => {
      if (result.isConfirmed) {
        let {data} = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' +productId ,{
      headers : {
        token:localStorage.getItem('token')
      }
    })
    setCart(data);
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary product is safe :)",
          icon: "error"
        });
      }
    });
    
  }





  async function clearCart(){
    let {data} = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart' ,{
      headers : {
        token:localStorage.getItem('token')
      }
    })
    setCart(data)
  }






  function updateCartProductCount(productId , count){
    clearTimeout(timeOutId)
    setTimeOutId(setTimeout( async () => {
      if(count == 0){
        removeProductFromCart(productId)
      }else{
        const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/cart/'+productId , {
        count  // count:count
      },{
        headers:{
          token : localStorage.getItem('token')
        }
      })
      setCart(data);
      }
    }, 500))
  }






  useEffect(()=>{
    getLoggedUserCart()
  }, [])





  return (
    <>
    { isLoading ? 
    <div className='d-flex align-items-center justify-content-center my-5 py-5'>
    <i className='fas fa-spin fa-spinner fa-2x'></i>
    </div>
    :
    cart.data?.products.length > 0 ?
    
      <>
      <div className='my-5'>
        <button onClick={clearCart} className='btn btn-outline-danger d-block ms-auto'>Clear Cart</button>
        {cart.data?.products.map((cartProduct , index)=>{
          return <CartProduct key={index} updateCartProductCount={updateCartProductCount} removeProductFromCart={removeProductFromCart} cartProduct={cartProduct}/>
        })}
        <div className='d-flex justify-content-between'>
          <Link to={'/address/' + cartId} className='btn bg-main text-white'>CheckOut</Link>
          <p>Total cart Price: {cart.data?.totalCartPrice} EGP</p>
        </div>
      </div>
      </>
      :
      <h2 className='alert alert-warning text-center my-5'>No products in your cart</h2>
    }
    </>
  )
}
