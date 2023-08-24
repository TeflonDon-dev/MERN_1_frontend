import React, { useEffect, useState } from 'react'
import CardFeature from './CardFeature'
import FilterProduct from './FilterProduct'
import { useSelector } from 'react-redux';

const AllProduct = ({heading,loading}) => {
 const productData = useSelector(state => state.product.productList);
    
  const [filterBy, setFilterBy] = useState("");
    
  const categoryList=[...new Set(productData.map(el=>el.category))]

  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData)
  },[productData])

  const handleFilterProduct = (category) => {
    setFilterBy(category)
        const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase())
        setDataFilter(() => {
            return [
                ...filter
            ]
        })
    };

      const loadingArrayFeature = new Array(12).fill(null);
    return (
      
      <>
        <div className=" my-5 ">
                <h2 className=' mb-4 font-bold text-2xl text-slate-800'>{ heading}</h2>
        <div className=" flex gap-4 justify-center overflow-scroll scrollbar-none  ">
          {categoryList[0] ? categoryList.map((el,index) => (
            <FilterProduct
              key={index}
              onClick={() => handleFilterProduct(el)}
              category={el}
              isActive={el===filterBy}
            
            />
          )): (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>loading...</p>
          </div>
        )}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 my-4">
        {
          dataFilter[0]?dataFilter.map(el => (
            <CardFeature
              id={el._id}
              key={el._id}
              image={el.image}
              name={el.name}
              category={el.category}
              price={el.price}
            />
          )): loadingArrayFeature.map((el,index) => (
              <CardFeature loading={loading} key={index+"allProduct"} />
            ))
        }
      </div>
      </>
  )
}

export default AllProduct