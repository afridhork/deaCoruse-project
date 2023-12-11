import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import CloseBtn from '../../assets/close.svg'
import { addItemToCart } from "../cart/cartSlice";
import { useState } from "react";
const ProductModal = ({ handleHideModalProduct, dataProduct }) => {
const [product, setProduct] = useState(dataProduct)
const dispatch = useDispatch()

  const handleCheckoutToWhatsapp = () => {
    if (totalItems === 0) return;

    const phoneNumber = "6281285241889";
    const message = encodeURIComponent(
      `Halo, saya ingin membeli ${totalItems} barang dengan total harga ${totalPrice}`
    );

    const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(URL, "_blank");
  };

  const increaseQty = () => {
     setProduct(prev => ({
      ...prev,
      quantity: prev.quantity + 1,
      totalPrice: prev.price * (prev.quantity + 1)
     }))
   }
   
   const decreaseQty = () => {
      if(product.quantity !== 0){
         setProduct(prev => ({
          ...prev,
          quantity: prev.quantity - 1,
          totalPrice: prev.price * (prev.quantity - 1)
         }))
      }
  }

  const handleClickAddCart = (productData) =>{
   dispatch(addItemToCart(product))
   handleHideModalProduct()
 }

  return (
    <Modal>
      <div className="flex flex-col gap-6 p-1 sm:p-2 w-full lg:w-[400px] max-h-[500px]">
        <div className="flex flex-col gap-6 max-h-[500px] overflow-auto">
            <div
               className="w-full pb-4"
            >
               <div className="flex justify-end">
                  <button
                     type="button"
                     className="bg-white text-white text-sm"
                     onClick={handleHideModalProduct}
                  >
                     <img src={CloseBtn} className="w-4 h-4" alt="" />
                  </button>
               </div>
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
                        onClick={decreaseQty}
                        >
                        -
                        </button>
                        <h3>{product.quantity}</h3>
                        <button
                        type="button"
                        className="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                        onClick={increaseQty}
                        >
                        +
                        </button>
                     </div>
                  </div>
               </div>
            </div>
        </div>
        <div>
          {/* <h3 className="text-md font-bold">Total Item: {totalItems}</h3>
          <h3 className="text-md font-bold">Total Price: {totalPrice}</h3> */}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="bg-gray-600 hover:bg-slate-800 text-white font-bold py-1 px-3 rounded-xl text-sm"
            onClick={() => handleClickAddCart(product)}
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-3 rounded-xl text-sm"
            onClick={handleCheckoutToWhatsapp}
          >
            Checkout (whatsapp)
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
