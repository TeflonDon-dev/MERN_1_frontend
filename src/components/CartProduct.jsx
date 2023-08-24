import React from 'react';
import{AiOutlinePlus,AiOutlineMinus,AiOutlineDelete} from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { decreaseQty, deleteCartItems,increaseQty } from '../redux/productSlice';

const CartProduct = ({id,qty,image,total,category,price,name}) => {
  
    const dispatch=useDispatch()
  
    return (
      <div className=' bg-slate-200 p-2 flex gap-4 rounded border border-slate-300'>
          <div className=" bg-white rounded overflow-hidden">
              <img src={image} className=' object-cover h-28 w-40 p-3 ' alt="" />
          </div>
          <div className="flex flex-col gap-1 w-full">
              <div className=" flex justify-between">
              <h3 className=' font-semibold text-slate-600 capitalize text-lg md:text-xl'>{name}</h3>
              <div onClick={()=>dispatch(deleteCartItems(id))} className=" cursor-pointer text-slate-700 hover:text-red-600"><AiOutlineDelete/></div>
              </div>
        <p className='  text-slate-500 font-medium text-base'>{category}</p>
              <p className='font-bold text-base'>$ <span>{price}</span></p>
              <div className='flex justify-between '>
          <div className=' flex gap-3 items-center'>
                  <button onClick={()=>dispatch(increaseQty(id))} className=' py-1 hover:bg-slate-400 bg-slate-500 mt-2 rounded-sm p-1'><AiOutlinePlus/></button>
                  <p className=' font-semibold p-1'>{qty}</p>
                  <button onClick={()=>dispatch(decreaseQty(id))} className=' py-1 hover:bg-slate-400  bg-slate-300 mt-2 rounded-sm p-1'><AiOutlineMinus /></button>
                  </div>
          
              <div className=' flex items-center gap-2 font-bold text-slate-700'>
                  <p>Total</p>
                  <p>$ {total}</p>
                  </div>
                      </div>
        
        </div>
    </div>
  )
}

export default CartProduct