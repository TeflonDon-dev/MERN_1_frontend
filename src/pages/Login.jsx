import React, { useState } from 'react';
import logingif from '../imgs/logingif.gif'
import {BiShow,BiHide} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import{login} from "../redux/userSlice"

const Login = () => {

    const navigate=useNavigate()

     const [showPassword, setShowPassword] = useState(false)
    
    const [data, setData] = useState({
        email: "",
        password: "",
      
    })

    const userData = useSelector(state => state.user)
    


    const dispatch=useDispatch()

    
    const handleShowPassword = () => {
        setShowPassword(prevstate => !prevstate);
    }

    const handleOnChange = (e) => {
        const {name, value} = e.target
        
        setData(prevstate => {
            return {
                ...prevstate,
                [name]:value
            }
        })

    }

    const handleSubmit = async(e) => {
        e.preventDefault() 
        const { email, password } = data;

        if (email && password) {
            
            const fetchData = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/login`, {
                method: "POST",
                headers: {
                    "content-type":"application/json"
                },
                body:JSON.stringify(data)
            })
            const response = await fetchData.json()

            toast(response.message)
            
            if (response.alert) {
              dispatch(login(response))
                setTimeout(() => {
                    
                    navigate('/')
                }, 1000);
            }
                console.log(userData);
           
        } else {
            alert('enter required fields')
        }
    }
  return (
 <div className=' p-3 md:p-4'>
          <div className=' w-full max-w-sm bg-white m-auto flex  flex-col p-2'>
              {/* <h1 className=' text-center text-2xl font-bold'>sign up</h1> */}
              <div className=' w-20 overflow-hidden rounded-full drop-shadow-md shadow-md mx-auto'>
                  <img src={logingif} className=' w-full' alt="" />
              </div>
              <form onSubmit={handleSubmit}  className=' w-full py-3 flex flex-col'>
                  <label htmlFor="email">Email</label>
                  <input onChange={handleOnChange} value={data.email} type="email" name="email" id="email" className='focus:outline-blue-300 mt-1 mb-2 bg-slate-200 px-1 py-1 w-full' />
                  <label htmlFor="password">Password</label>
                  <div className=' flex rounded  mt-1 mb-2  bg-slate-200 px-1 py-1 relative'>
                  <input onChange={handleOnChange} value={data.password} type={showPassword?'text':'password'} name="password" id="password" className=' w-full focus:outline-blue-300 outline-none border-none bg-slate-200' />
                  <span onClick={handleShowPassword} className=' cursor-pointer flex text-xl absolute right-0'>
                          {showPassword ? <BiShow /> : <BiHide />}
                  </span>
                  </div>
                  <button className=' max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4' >Log in</button>
              </form>
              <p className=' text-sm mt-3'>Don't have account ?<Link className=' underline text-red-600' to={"/signup"}>Sign up</Link></p>
          </div>
    </div>
  )
}

export default Login