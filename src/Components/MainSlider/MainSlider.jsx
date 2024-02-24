import React from 'react'
import sliderImgOne from '../../Assets/Imgs/slider-image-1.jpeg'
import sliderImgTwo from '../../Assets/Imgs/slider-image-3.jpeg'
import grocerBannerOne from '../../Assets/Imgs/grocery-banner.png'
import grocerBannerTwo from '../../Assets/Imgs/grocery-banner-2.jpeg'
import Slider from "react-slick";

export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows : false,
    }

  return (
    <div className="row g-0 my-2">
        <div className="col-md-10">
        <Slider {...settings} >
          <figure className='mb-0'> <img src={grocerBannerOne} style={{ width:"100%" , height:"400px"}} alt="" /> </figure>
          <figure className='mb-0'> <img src={grocerBannerTwo} style={{ width:"100%" , height:"400px"}} alt="" /> </figure>
        </Slider>
        </div>
        <div className="col-md-2">
          <img src={sliderImgOne} style={{ width:"100%" , height:"200px"}} alt="sliderImgOne" />
          <img src={sliderImgTwo} style={{ width:"100%" , height:"200px"}} alt="sliderImgTwo" />
        </div>
      </div>
  )
}
