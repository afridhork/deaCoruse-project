import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getProductsDynamic } from '../productList/dynamicProductSlice'
import { getProductsStatic } from '../productList/staticProductSlice'

import { selectSortingResult, sorting } from './sortingSlice'
import { search, selectSearchResult } from './searchSlice'
import { filter, selectFilterResult } from './filterSlice'

const SearchBar = ({handleSearchKeyExist, isSearchKeyExist}) => {
  const dispatch = useDispatch()
  const products = useSelector(getProductsDynamic)
  const [result, setResult] = useState([])
  const [resultFilter, setResultFilter] = useState([]) //data cadangan ketika key word search bernilai ''
  const filterResult = useSelector(selectFilterResult)
  const sortingResult = useSelector(selectSortingResult)

  useEffect(() => {
    if(filterResult.length > 0 ){
      setResult(filterResult)
      setResultFilter(filterResult)
    }
  }, [filterResult])

  useEffect(() => {
    sortingResult.length > 0 && setResult(sortingResult)
  }, [sortingResult])

  useEffect(() => {
    setResult(products)
  }, [products])

  const handleSearch = (e) => {
    if(e.key === 'Enter'){
      handleSearchKeyExist(e.target.value)
      if(e.target.value){
        console.log('isSearchKeyExist 1',isSearchKeyExist);
        const sendSearchData = {
          type: e.target.value,
          products: result
        }
        dispatch(search(sendSearchData))
      }else if(resultFilter){
        console.log('isSearchKeyExist',isSearchKeyExist);
        const sendSearchData = {
          type: e.target.value,
          products: resultFilter
        }
        dispatch(search(sendSearchData))
      }else{
        const sendSearchData = {
          type: e.target.value,
          products
        }
        dispatch(search(sendSearchData))

      }
    }
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder='search product in Simple E-Commerce' 
        className='text-sm w-[290px] sm:w-[415px] md:w-[615px] lg:w-[400px] rounded-lg placeholder:text-sm focus:outline-0 p-1 pl-2 mr-4' 
        onKeyDown={handleSearch}
      />
    </div>
  )
}

const SortingBar = () =>{
  const [isClicked, setIsClicked] = useState(null)
  const [result, setResult] = useState([])
  const dispatch = useDispatch()
  const products = useSelector(getProductsDynamic)
  const searchResult = useSelector(selectSearchResult)
  const filterResult = useSelector(selectFilterResult)
  
  useEffect(() => {
    setIsClicked(true)
  }, [])

  useEffect(() => {
    setResult(products)
  }, [products])

  useEffect(() => {
    searchResult.length > 0 && setResult(searchResult)
  }, [searchResult])

  useEffect(() => {
    filterResult.length > 0 && setResult(filterResult)
  }, [filterResult])
  
  const handleSortingChoice = (e) => {
    if(e.target.value){
      const sendDataSorting  ={
        type: e.target.value,
        products: result
      } 
      dispatch(sorting(sendDataSorting))
    }
  }
  return(
    <>
      <select
        className='text-sm w-[140px] sm:w-[205px] md:w-[300px] lg:w-[250px] rounded-lg focus:outline-0 p-1 mr-1 sm:mr-1 md:mr-4'
        onChange={handleSortingChoice}
      >
        <option value="" disabled={isClicked ? true : false}>Sort By</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
        <option value="highest">Highest Price</option>
        <option value="lowest">Lowest Price</option>
      </select>
    </>
  )
}

const FilterBar = ({isSearchKeyExist}) => {
  const [isClicked, setIsClicked] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [result, setResult] = useState([])
  const products = useSelector(getProductsDynamic)
  const searchResult = useSelector(selectSearchResult)
  const sortingResult = useSelector(selectSortingResult)
  const [category, setCategory] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    searchResult.length > 0 && setResult(searchResult)
  }, [searchResult])

  useEffect(() => {
    sortingResult.length > 0 && setResult(sortingResult)
  }, [sortingResult])
  

  useEffect(() => {
    setIsClicked(true)
    setResult(products)
    const categoryTemp = []
    if(category.length < 1){
      for(let i in products){
        if (categoryTemp.indexOf(products[i].category) === -1) {
          categoryTemp.push(products[i].category)
        }
      }
      setCategory(categoryTemp)
    }

  }, [products])

  const handleCategory = (e) => {
    if(e.target.value){
      const selectedValue = e.target.value;
      setSelectedCategory((prev) =>
        prev === selectedValue ? prev : selectedValue
      );
      console.log('cek result', selectedCategory);
      const sendDataCategory = {
        type: selectedValue,
        products: isSearchKeyExist ? result : products,
      }
      dispatch(filter(sendDataCategory))
    }
  }
  return(
    <>
      <select 
        className='text-sm w-[140] sm:w-[205px] md:w-[300px] lg:w-[250px] rounded-lg focus:outline-0 p-1'
        onChange={handleCategory}
      >
        <option value="" disabled={isClicked ? true : false}>Category</option>
        {
          category.length > 0 && (
            category.map((value,index) => {
              return (
                <option key={index} value={value}>{value}</option>
              )
            })
          )
        }
      </select>
    </>
  )
}

const FormInput = () => {
  const [isSearchKeyExist, setIsSearchKeyExist] = useState('')
  const handleSearchKeyExist = (searchKey) => {
    setIsSearchKeyExist(searchKey)
  }
  return(
    <>
      <div className='grid sm:grid lg:flex grid-rows-2 gap-2'>
        <SearchBar handleSearchKeyExist={handleSearchKeyExist} isSearchKeyExist={isSearchKeyExist} />
        <div className='flex'>
          <SortingBar/>
          <FilterBar isSearchKeyExist={isSearchKeyExist}/>
        </div>
      </div>
    </>
  )
}

export default FormInput