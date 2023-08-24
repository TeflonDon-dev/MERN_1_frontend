import React, { useRef, useState } from 'react'
import HomeCard from '../components/HomeCard'
import { useSelector } from 'react-redux'
import CardFeature from '../components/CardFeature';
import Spinner from '../components/Spinner';
import { GrNext, GrPrevious } from "react-icons/gr";
import FilterProduct from '../components/FilterProduct';
import { useEffect } from 'react';
import AllProduct from '../components/AllProduct';



const Home = () => {

  const productData = useSelector(state => state.product.productList
);


  const homeProductCartList=productData.slice(1,5)

  const homeProductCartListVegetables = productData.filter(el => el.category === "vegetables", [])


  const loadingArray= new Array(4).fill(null)
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  
  const nextProduct = () => {
    slideProductRef.current.scrollLeft+=200
  }

  const prevProduct = () => {
  slideProductRef.current.scrollLeft-=200
  }


  return (
    <div className=' p-2 md:p-4'>
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2 ">
          <div className="flex gap-3 bg-slate-400 px-2 w-36 items-center rounded-full">
            <p className=' text-sm font-medium text-slate-900'>Bike Delivery</p>
            <img src="https://cdn-icons-png.flaticon.com/512/171/171253.png" className='h-7' alt="" />
          </div>
          <h2 className=' text-4xl font-bold md:text-7xl py-3'>The Fastest Delivery in <span className=' text-red-600'>Your Home</span></h2>
          <p className=' py-3 text-base'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore optio sapiente ipsam, excepturi et nostrum rerum provident molestias! Distinctio, adipisci! Expedita, molestias. Cumque exercitationem reiciendis, nesciunt nisi, architecto numquam ipsum repellendus enim possimus tempora, laudantium labore quas maxime? Beatae fuga incidunt fugiat, ipsum veniam soluta debitis est at reiciendis dolorum!</p>
          <button className=' text-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'>Order Now</button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-4 p-4 justify-center">
          {homeProductCartList[0] ? homeProductCartList.map(el => (
            <HomeCard
              id={el._id}
              key={el._id}
              image={el.image}
              name={el.name}
              price={el.price}
              category={el.category}
            />
          )) : loadingArray.map((el,index) => (
            <HomeCard
              key={index}
              loading={<Spinner/>}
            />
          ))}
        </div>
      </div>

      <div>
        <div className=' flex w-full items-center'>
          <h2 className=' mb-4 font-bold text-2xl text-slate-800'>Fresh vegetables</h2>
          <div className=" ml-auto flex gap-4">
            <button onClick={prevProduct} className=' p-1 rounded bg-slate-300 hover:bg-slate-400 text-lg'><GrPrevious/></button>
            <button onClick={nextProduct} className=' p-1 rounded bg-slate-300 hover:bg-slate-400 text-lg'><GrNext/></button>
          </div>
        </div>
  
        <div ref={slideProductRef} className=" scroll-smooth transition-all flex gap-5 overflow-scroll scrollbar-none">
          {homeProductCartListVegetables[0] ?  homeProductCartListVegetables.map(el => (
            <CardFeature
              key={el._id}
              id={el._id}
              name={el.name}
              category={el.category}
              price={el.price}
              image={el.image}
            />
          )) : (
              loadingArrayFeature.map((el,index) => (
                <CardFeature
                  key={index}
                   loading={<Spinner/>}
                />
            )
            
          
          ))}
          
        </div>
        <AllProduct loading={<Spinner/>} heading={"Your Products"} />
        </div>

      
    

    </div>
  )
}

export default Home