import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storeStatic } from './staticProductSlice'
import StarRating from '../starRating/StarRating'
import { selectSortingResult } from '../formInput/sortingSlice'
import Skeleton from 'react-loading-skeleton'
import { storeDynamic } from './dynamicProductSlice'

import 'react-loading-skeleton/dist/skeleton.css'
import { selectSearchResult } from '../formInput/searchSlice'
import { selectFilterResult } from '../formInput/filterSlice'

const ProductList = ({handleOpenModalProduct}) => {
   const [products, setProducts] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const dispatch = useDispatch()
   const resultSearch = useSelector(selectSearchResult)
   const resultSorting = useSelector(selectSortingResult)
   const resultFilter = useSelector(selectFilterResult)

   useEffect(() => {
      const fetchProducts = async () =>{
         setIsLoading(true)
         try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data)
            dispatch(storeStatic(data))
            dispatch(storeDynamic(data))
         } catch (error) {
            console.error(error);
         } finally {
            setTimeout(() => {
               setIsLoading(false)
            }, 500);
         }
      }
      fetchProducts()
    }, [])

   useEffect(() => {
      setProducts(resultSearch)
   }, [resultSearch])

   useEffect(() => {
      setProducts(resultSorting)
   }, [resultSorting])

   useEffect(() => {
      setProducts(resultFilter)
   }, [resultFilter])
   
  return (
   <div className='w-full h-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10'>
      {
         products.map((product, index) => {
            return(
               <>
               {
                  isLoading ? (
                     <Skeleton key={index} height="400px"/>
                  ):(
                     <div key={index} className='bg-white rounded-xl border shadow p-4'>
                        <div className='group relative flex items-center justify-center w-[80%] h-[200px] mx-auto overflow-hidden'>
                           <img 
                              src={product.image} 
                              alt={product.title} 
                              className='w-[80%] h-[80%] object-contain group-hover:scale-110 transition-scale duration-500 ease-in-out' 
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <button
                              type='button'
                              className='bg-cyan-700 text-white hover:bg-cyan-800 rounded-lg text-sm py-3 px-8'
                              onClick={() => handleOpenModalProduct(product)}
                           >
                              See Product
                           </button>
                           <h3 className='font-bold min-h-[96px]'>{product.title}</h3>
                           <div className="flex flex-wrap">
                              <span className='text-xs border border-black rounded-lg px-2 object-contain'>{product.category}</span>
                           </div> 
                           <div className='flex justify-between'>
                              <h3>${product.price}</h3>
                              <div className='flex items-end'>
                                 <StarRating value={product.rating.rate} height={20} width={20} spacing={0} />
                                 <span className='text-xs text-gray-500'>{product.rating.rate + '|' + product.rating.count + " sold"}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  )
               }
               </>
            )
         })
      }
   </div>
  )
}

export default ProductList