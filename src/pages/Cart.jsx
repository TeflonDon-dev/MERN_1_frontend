import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItems } from '../redux/productSlice'
import CartProduct from '../components/CartProduct'
import emptyCartGif from "../assets/empty-cart.gif"
import { toast } from 'react-hot-toast'
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const navigate = useNavigate();

  const user = useSelector(state => state.user);



  const dispatch = useDispatch()
  
  const productCartItems = useSelector(state => state.product.cartItems);



  const totalPrice=productCartItems.reduce((acc,curr)=>acc +parseInt(curr.total),0)
const totalQty=productCartItems.reduce((acc,curr)=>acc +parseInt(curr.qty),0)
 

  
  const handlePayment = async () => {

    if (user.email) {
      
      const stripePromise=await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY)
    const res = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/checkout-payment`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(productCartItems)
    });
    if (res.statuscode === 500) {
      return
    }
    const data =await res.json();

  
    toast("Redirect to payment gateway...")
    stripePromise.redirectToCheckout({sessionId:data})
    } else {
      toast("Login to continue with checkout")
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    }

    
  }
  
  return (
    <>
      
      <div className=' p-2 md:p-4'>
        <h2 className=' md:text-2xl font-bold text-lg text-slate-600'>Your Cart Items</h2>
        
        {
          productCartItems[0] ?
   
          <div className=" my-4 flex gap-3 flex-col md:flex-row">
              {/* DISPLAY CART ITEMS */}
        <div className=" w-full max-w-3xl">
          {
            productCartItems.map(el => {
              return (
                <CartProduct
                  key={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                  id={el._id}
                  price={el.price}
                />
              )
            })
                }
              </div>
              {/* total cart items */}
        <div className=" w-full max-w-md md:ml-auto">
          <h2 className=' bg-blue-500 text-white p-2 text-lg'>Summary</h2>
          <div className=' flex w-full py-2 text-lg border-b'>
            <p>Total Quantity</p>
            <p className=' ml-auto w-32 font-bold'>{ totalQty}</p>
          </div>
          <div className=' flex w-full py-2 text-lg border-b'>
            <p>Total Price</p >
            <p className=' ml-auto w-32 font-bold'>$ {totalPrice}</p>
          </div>
          <button onClick={handlePayment} className=' bg-red-500 w-full text-lg font-bold text-white py-2'>Payment</button>
              </div>
            </div>
            :
            <>
              <div className=' flex-col flex w-full justify-center items-center'>
                <img className=' w-full max-w-sm' src={emptyCartGif} alt="" />
                <p className=' text-3xl text-slate-500 font-bold'>Empty cart</p>
            </div>
            </>
             }
      </div>
      
      </>
  )
}

export default Cart