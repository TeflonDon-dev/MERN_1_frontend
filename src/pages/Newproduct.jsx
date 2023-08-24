import React, { useState } from 'react';
import {BsCloudUpload} from "react-icons/bs"
import { imgTobase64 } from '../utils/ImgTobase64';
import { toast } from 'react-hot-toast';

const Newproduct = () => {

  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: ""
  });

  const handleOnChange = (e) => {
       const { name, value } = e.target
    setData(prevestate => {
      return {
        ...prevestate,
        [name]:value
      }
    })

  }

  const handleSubmit = async(e) => {
    e.preventDefault();


    const{name,image,price,category}=data

    if (name && image && price && category) {
      
      const fetchData = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/uploadproduct`, {
        method: 'POST',
        headers: {
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
      });
      const response = await fetchData.json();
  
      console.log(response);
      toast(response.message)

      setData({
        name: "",
        category: "",
        image: "",
        price: "",
        description: ""
      })
    } else {
      toast("Enter required fields")
    }
  }

  const uploadImage = async(e) => {
        const data = await imgTobase64(e.target.files[0]);

    
    setData(prevestate => {
      return {
        ...prevestate,
        image:data
      }
    })
}

  return (
    <div className='p-4'>
      <form onSubmit={handleSubmit} className=' bg-white m-auto w-full max-w-md  shadow flex flex-col p-3'>
        <label htmlFor="name">Name</label>
        <input value={data.name} onChange={handleOnChange} className=' bg-slate-200 p-1 my-1' type="text" name='name' id='name' />
        <label htmlFor="category">Category</label>
        <select value={data.category} onChange={handleOnChange} className=' bg-slate-200 p-1 my-1' name='category' id='category'>
          <option value={"other"}>select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetables"}>Vegetables</option>
          <option value={"icecream"}>Icecream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"paneer"}>Paneer</option>
        </select>
        <label className=' cursor-pointer' htmlFor="image">Image
        <div className=" h-40 w-full bg-slate-200  rounded flex items-center justify-center">
           {!data.image && <span className=' text-5xl'><BsCloudUpload /></span>} 
            <img src={data.image} className='  h-full' alt="" />
          <input  name='image' type="file" accept='image/' id='image'  onChange={uploadImage} className='hidden'/>
          </div>
          </label>
        <label className=' my-1' htmlFor="price">Price</label>
        <input value={data.price} id='price' name='price' onChange={handleOnChange} type="text" className=' bg-slate-200 p-1 my-1' />
        <label htmlFor="description">Description</label>
        <textarea value={data.description} onChange={handleOnChange} className=' bg-slate-200 p-1 my-1 resize-none' name="description" id="description"  rows="2"></textarea>
      <button className='bg-red-500 hover:bg-red-600 text-white font-bold text-lg drop-shadow my-2'>Save</button>
      </form>
    </div>
  )
}

export default Newproduct