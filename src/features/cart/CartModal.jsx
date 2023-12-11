import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import {
  removeItemFromCart,
  selectCartItems,
  selectCartItemsTotal,
  selectCartTotalPrices,
} from "./cartSlice";
import { useEffect, useState } from "react";

const CartModal = ({ handleHideModalCart, totalItems, handleTotalItems }) => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrices);
  const [products, setProducts] = useState([])
  const [totalPriceState, setTotalPriceState] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    setProducts(cartItems)
    setTotalPriceState(totalPrice)
  }, [cartItems,totalPrice])
  
  const handleCheckoutToWhatsapp = () => {
    if (totalItems === 0) return;

    const phoneNumber = "6281285241889";
    const message = encodeURIComponent(
      `Halo, saya ingin membeli ${totalItems} barang dengan total harga ${totalPrice}`
    );

    const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(URL, "_blank");
  };

  const increaseQty = (product) => {
    handleTotalItems('increase')
    setProducts([...products].map(item => {
      if(item.id == product.id){
        setTotalPriceState(prev => prev + item.price)
        return{
          ...item,
          quantity: item.quantity + 1,
          totalPrice: item.price * (item.quantity + 1)
        }
      }else{
        return item
      }
    }))
  }
  
  const decreaseQty = (product,index) => {
    if(product.quantity !== 1){
      handleTotalItems('decrease')
      setProducts([...products].map(item => {
        if(item.id == product.id){
          setTotalPriceState(prev => prev - item.price)
          dispatch(removeItemFromCart(products))
          return{
            ...item,
            quantity: item.quantity - 1,
            totalPrice: item.price * (item.quantity - 1)
          }
        }else{
          return item
        }
      }))
    }else if(product.quantity === 1){
      const delProducts = [...products]
      delProducts.splice(index,1)
      setProducts(delProducts)
      dispatch(removeItemFromCart(delProducts))
     }
 }

  return (
    <Modal>
      <div className="flex flex-col gap-6 p-1 sm:p-2 w-full lg:w-[400px] max-h-[500px]">
        <div className="flex flex-col gap-6 max-h-[500px] overflow-auto">
          {products.map((product,index) => {
            return (
              <div
                className="w-full border-b-4 border-blue-200 pb-4"
                key={product.id}
              >
                <div className="flex items-center w-full">
                  <div className="w-[120px] h-auto overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-10 w-[75%]">
                    <h3 className="capitalize mt-3 text-lg">{product.title}</h3>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm">{product.price}</h4>
                      <h3 className="text-lg font-bold">
                        {product.totalPrice}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 mt-4 ml-auto">
                      <button
                        type="button"
                        className="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                        onClick={()=>decreaseQty(product,index)}
                        >
                        -
                      </button>
                      <h3>{product.quantity}</h3>
                      <button
                        type="button"
                        className="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                        onClick={()=>increaseQty(product)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h3 className="text-md font-bold">Total Item: {totalItems}</h3>
          <h3 className="text-md font-bold">Total Price: {totalPriceState.toFixed(2)}</h3>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="bg-slate-600 hover:bg-slate-800 text-white py-3 px-8 rounded-xl text-sm"
            onClick={handleHideModalCart}
          >
            Close
          </button>
          <button
            type="button"
            className="bg-green-600 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl text-sm"
            onClick={handleCheckoutToWhatsapp}
          >
            Checkout (whatsapp)
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
