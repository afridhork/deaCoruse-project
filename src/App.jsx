import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import ProductList from './features/productList/ProductList'
import CartModal from './features/cart/cartModal'
import ProductModal from './features/productList/ProductModal'
import { useSelector } from 'react-redux'
import { selectCartItemsTotal } from './features/cart/cartSlice'

function App() {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false)
  const [isOpenModalProduct, setIsOpenModalProduct] = useState(false)
  const [product, setProduct] = useState({})
  const totalItems = useSelector(selectCartItemsTotal)
  const [totalItemsState, setTotalItemsState] = useState(null)

  useEffect(() => {
    setTotalItemsState(totalItems)
  }, [totalItems])
  

  const handleOpenModalCart = () => {
    setIsOpenModalCart(true)
  }
  
  const handleHideModalCart = () => {
    setIsOpenModalCart(false)
  }
  
  const handleOpenModalProduct = (product) => {
    setIsOpenModalProduct(true)
    const newProduct = {...product}
    newProduct.quantity = 1
    newProduct.totalPrice = newProduct.price
    setProduct(newProduct)
  }

  const handleHideModalProduct = () => {
    setIsOpenModalProduct(false)
  }

  const handleTotalItems = (type) => {
    if(type == 'increase'){
      setTotalItemsState(prev => prev + 1)
    }else if(type == 'decrease'){
      setTotalItemsState(prev => prev - 1)
    }
  }
  
  return (
    <>
      {
        isOpenModalCart 
          ? 
            <CartModal 
              handleHideModalCart={handleHideModalCart} 
              totalItems={totalItemsState} 
              handleTotalItems={handleTotalItems} 
            /> 
          : 
            null
      }
      {isOpenModalProduct ? <ProductModal dataProduct={product} handleHideModalProduct={handleHideModalProduct} /> : null}
      <Header handleOpenModalCart={handleOpenModalCart} totalItems={totalItemsState}/>
      <main className='max-w-7xl mx-auto px-4'>
        <ProductList handleOpenModalProduct={handleOpenModalProduct}/>
      </main>
    </>
  )
}

export default App
