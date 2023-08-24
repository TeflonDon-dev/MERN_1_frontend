import React from 'react'
import { Link } from 'react-router-dom';
import { addCartItems } from '../redux/productSlice';
import { useDispatch } from 'react-redux';

const CardFeature = ({loading,image,name,price,category,id}) => {
  const dispatch = useDispatch()
  
  const handleAddToCart = (e) => {
    dispatch(addCartItems({
      _id: id,
      name: name,
      price: price,
      category: category,
      image:image
    }))
  }

  return (
    <div className=' flex justify-center flex-col items-center w-full min-w-[200px] max-w-[200px] bg-white cursor-pointer hover:shadow-lg drop-shadow-lg py-5 px-4 '>
      {
        image ?  
          <>
          <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0", behavior:"smooth"})}>
        <div className=" h-28">
        <img src={image} className='h-full' alt="" />
      </div>
       <h3 className=' font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden'>{name}</h3>
        <p className=' text-slate-500 font-medium'>{category}</p>
              <p className='  font-bold'>$ <span>{price}</span></p>
               </Link>
      <button onClick={handleAddToCart} className=' hover:bg-yellow-600 w-full bg-yellow-500 mt-2 rounded-sm py-1'>Add to cart</button>
           
      </>
          : <div className=' min-h-[150px] flex justify-center items-center'>
            <div>{loading}</div>
       </div>
      }
          </div>

     
  )
}

export default CardFeature