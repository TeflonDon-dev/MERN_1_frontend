import React, { useState } from 'react';
import logingif from '../imgs/logingif.gif'
import {BiShow,BiHide} from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { imgTobase64 } from '../utils/ImgTobase64';
import { toast } from 'react-hot-toast';


const Signup = () => {
    
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: ""
    })

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(prevstate => !prevstate)
    }

    
    const handleShowPassword = () => {
        setShowPassword(prevstate => !prevstate);
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        
        setData(prevstate => {
            return {
                ...prevstate,
                [name]: value
            }
        })

    }
 
    const handleSubmit = async (e) => {
        e.preventDefault() 
        const { firstName, email, password, confirmPassword } = data;

        if (firstName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                const fetchData = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/signup`, {
                    method: "POST",
                    headers: {
                        "content-type":"application/json"
                    },
                    body:JSON.stringify(data)
                })
                const response = await fetchData.json()
              
               
                // alert(response.message)
                toast(response.message)
                if (response.alert) {
                    navigate('/login')
                }
                // navigate('/login')
            } else {
                alert("password and confirm password not equal")
            }
        } else {
            alert('enter required field')
        }
    }
    const handleUploadProfile=async (e) => {
      
        const data = await imgTobase64(e.target.files[0]);
        console.log(data);
        setData(prevstate => {
            return {
                ...prevstate,
                image:data

            }
        })
}

  return (
      <div className=' p-3 md:p-4'>
          <div className=' w-full max-w-sm bg-white m-auto flex  flex-col p-2'>
              {/* <h1 className=' text-center text-2xl font-bold'>sign up</h1> */}
              <div className='relative w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md mx-auto'>
                  <img src={data.image?data.image:logingif} className=' w-full h-full' alt="" />
                 <label htmlFor="profileImage">
                  <div className="cursor-pointer absolute bottom-0 h-1/3 bg-slate-500 w-full text-center opacity-50">
                      <p className=' text-sm p-1 text-white'>upload</p>
                      </div>
                      <input accept='image/' onChange={handleUploadProfile} className='hidden ' type="file" name="" id="profileImage" />
                      </label>
              </div>
              <form onSubmit={handleSubmit}  className=' w-full py-3 flex flex-col'>
                  <label htmlFor="firstName">First Name</label>
                  <input onChange={handleOnChange} value={data.firstName} type="text" id='firstName' name='firstName' className=' mb-2 mt-1 bg-slate-200 px-1 py-1 w-full focus:outline-blue-300' />
                  <label  htmlFor="lastName">Last Name</label>
                  <input onChange={handleOnChange} value={data.lastName} type="text" id='lastName' name='lastName' className=' focus:outline-blue-300 mt-1 mb-2 bg-slate-200 px-1 py-1 w-full' />
                  <label htmlFor="email">Email</label>
                  <input onChange={handleOnChange} value={data.email} type="email" name="email" id="email" className='focus:outline-blue-300 mt-1 mb-2 bg-slate-200 px-1 py-1 w-full' />
                  <label htmlFor="password">Password</label>
                  <div className=' flex rounded  mt-1 mb-2  bg-slate-200 px-1 py-1 relative'>
                  <input onChange={handleOnChange} value={data.password} type={showPassword?'text':'password'} name="password" id="password" className=' w-full focus:outline-blue-300 outline-none border-none bg-slate-200' />
                  <span onClick={handleShowPassword} className=' cursor-pointer flex text-xl absolute right-0'>
                          {showPassword ? <BiShow /> : <BiHide />}
                  </span>
                  </div>
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  <div className=' flex rounded  mt-1 mb-2  bg-slate-200 px-1 py-1 relative'>
                  <input onChange={handleOnChange} value={data.confirmPassword} type={showConfirmPassword?'text':'password'} name="confirmPassword" id="confirmpassword" className=' w-full focus:outline-blue-300 outline-none border-none bg-slate-200' />
                  <span onClick={handleShowConfirmPassword} className=' cursor-pointer flex text-xl absolute right-0'>
                          {showConfirmPassword ? <BiShow /> : <BiHide />}
                  </span>
                  </div>
                  <button className=' max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4' >Sign up</button>
              </form>
              <p className=' text-sm mt-3'>Already have account ?<Link className=' underline text-red-600' to={"/login"}>Log in</Link></p>
          </div>
    </div>
  )
}

export default Signup