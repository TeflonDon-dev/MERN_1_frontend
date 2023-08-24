import React, { useEffect } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { setDataProduct } from './redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';


const App = () => {

  const dispatch = useDispatch();

  const productData = useSelector(state => state.product);



  const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/product`)
      const resData = await res.json()
    
    dispatch(setDataProduct(resData))
  }

  useEffect(()=>{
   fetchData()
  }, [])
  


  return (
    <>
       <Toaster />
    <div >
      <Header />
      <main className=' pt-16 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet/>
      </main>
    </div>
    </>
  )
}

export default App