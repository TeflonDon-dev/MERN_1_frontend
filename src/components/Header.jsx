import React, { useState } from 'react';
import logo from '../imgs/logo.png';
import { Link } from 'react-router-dom';
import {HiOutlineUserCircle} from "react-icons/hi";
import {BsCart} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { toast } from "react-hot-toast";

const Header = () => {
const dispatch=useDispatch()


    
    const userData = useSelector(state=>state.user);



    const handleLogOut = () => {
        dispatch(logout())
        toast("logged out successfully!")
}

    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => {
        setShowMenu(prevState=>!prevState)
    }

    const cartItemNumber=useSelector(state=>state.product.cartItems)
  return (
      <header className=' bg-white fixed w-full shadow-md h-16 px-2 md:px-4 z-50'>
          {/* desktop */}
          <div className=' flex items-center h-full justify-between'>
              <Link to={""}>
              <div className=' h-10'> 
                  <img className='h-full' src={logo} alt="" />
                  </div>
              </Link>
              <div className='flex items-center gap-4 md:gap-7'>
                  <nav className='gap-4 md:gap-7 text-base md:text-lg  hidden md:flex '>
                      <Link to={""}>Home</Link>
                      <Link to={"menu/64de03531340ce929dec3fd1"}>Menu</Link>
                      <Link to={"about"}>About</Link>
                      <Link to={"contact"}>Contact</Link>
                  </nav>
                  <div className='text-2xl text-slate-600 relative'>
                      <Link to={"cart"}>
                          <BsCart />
                         
                          <div className=" absolute top-0  text-white bg-red-500 -t0p-1 -right-1 h-4 text-sm text-center p-0 m-0 w-4 rounded-full">{cartItemNumber.length}</div>
                           </Link>
                  </div>
                  <div className=" text-slate-600"  onClick={handleShowMenu}>
                      <div className=" text-3xl cursor-pointer w-8 h-8">
                          {userData.image ? <img className='w-full h-full drop-shadow-lg overflow-hidden  rounded-full' src={ userData.image} />:<HiOutlineUserCircle/>}   
                      </div>
                      {showMenu &&
                          <div className=' flex flex-col absolute right-2 bg-white py-2  shadow drop-shadow-md min-w-[120px] text-center'>
                              {userData.email === import.meta.env.VITE_ADMIN_EMAIL &&
                                  <Link to={"newproduct"} className=' px-2  whitespace-nowrap cursor-pointer'>New Product</Link>}

                              {userData.image ? <p className='px-2 cursor-pointer text-white bg-red-500' onClick={handleLogOut}>Log out ({ userData.firstName})</p>:<Link to={"login"} className=' px-2 whitespace-nowrap cursor-pointer'>Login</Link>}
                           <nav className=' flex flex-col text-base md:text-lg  md:hidden'>
                      <Link className='py-1 px-2' to={""}>Home</Link>
                      <Link className='py-1 px-2' to={"menu/64de03531340ce929dec3fd1"}>Menu</Link>
                      <Link className='py-1 px-2'to={"about"}>About</Link>
                      <Link className='py-1 px-2'to={"contact"}>Contact</Link>
                  </nav>
                      </div>
                      }
                     
                  </div>
              </div>
          </div>

    </header>
  )
}

export default Header