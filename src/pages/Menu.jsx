import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AllProduct from '../components/AllProduct'
import { addCartItems } from '../redux/productSlice'

const Menu = () => {

  const navigate = useNavigate();

  const {filterby} = useParams()
  const productData=useSelector(state=>state.product.productList)
 
  const productDisplay=productData.filter(el=>el._id===filterby)[0]

  const dispatch=useDispatch()

  const handleAddToCart = (e) => {
    dispatch(addCartItems(productDisplay))
  }

  const handleBuy = () => {
    dispatch(addCartItems(productDisplay));
    navigate("/cart")
  }

  return (
   
        <div className='  p-2 md:p-4'>
    
          <div className='w-full max-w-4xl m-auto md:flex bg-white'>
            <div className=' max-w-md overflow-hidden w-full p-5'>
              <img src={productDisplay.image} alt="" className=' hover:scale-105 transition-all h-full' />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className=' font-semibold text-slate-600 capitalize text-2xl md:text-4xl'>{productDisplay.name}</h3>
              <p className='  text-slate-500 font-medium text-2xl'>{productDisplay.category}</p>
              <p className='font-bold md:text-2xl'>$ <span>{productDisplay.price}</span></p>
              <div className=' flex gap-3'>
                <button onClick={handleBuy} className=' py-1 hover:bg-yellow-600 bg-yellow-500 mt-2 rounded-sm min-w-[100px]'>Buy</button>
                <button onClick={handleAddToCart} className=' py-1 hover:bg-yellow-600  bg-yellow-500 mt-2 rounded-sm min-w-[100px]'>Add to cart</button>
              </div>
              <div>
                <p className=' text-slate-600 font-medium'>Description:</p>
                <p>{productDisplay.description}</p>
   
              </div>
            </div>

          </div>
        
          <AllProduct heading={"Related product"} />
       
        </div>
      
  )
}

export default Menu