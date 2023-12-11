import React from 'react'
import './../index.css'
import CartIcon from '../assets/cart.svg'
import FormInput from '../features/formInput/FormInput'

const Header = ({handleOpenModalCart, totalItems}) => {
  return (
   <header className='bg-cyan-700'>
      <div className="max-w-7xl mx-auto px-4">
         <div className="flex items-center justify-between h-20">
            <h1 className='hidden sm:hidden lg:hidden xl:inline text-xl font-bold text-gray-100'>Simple <br /> E-Commerce</h1>
            <FormInput />
            <div className='relative top-0 mb-8 sm:mb-8 lg:mb-0'>
               <button 
                  type='button'
                  className='relative rounded-full w-8 h-8 bg-cyan-800 p-2 text-gray-100'
                  onClick={handleOpenModalCart}
               >
                  {
                     totalItems > 0 ? (
                        <span className='absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-xs flex items-center justify-center'>{totalItems}</span>
                     ) : null
                  }
                  <img src={CartIcon} alt="cart" className='w-4 h-4' />
               </button>
            </div>
         </div>
      </div>
 </header>
  )
}

export default Header
