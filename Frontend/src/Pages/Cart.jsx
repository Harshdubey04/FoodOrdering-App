import React, { useContext,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRupeeSign } from "react-icons/fa6";
import { CDN_URL } from '../utils/constant';
import { addItem, decreaseItemByOne, emptyItem } from '../utils/Store/cartSlice';
import { Theme } from '../Contexts/ThemeContext';

const Cart = () => {  
const [isPaying, setIsPaying] = useState(false);
const [paymentSuccess, setPaymentSuccess] = useState(false);

const { theme } = useContext(Theme);
const cartItems = useSelector((store) => store.cart.items);

const quantity = useSelector((store) =>
  store.cart.items.reduce((total, item) => total + item.quantity, 0)
);

const total_price = cartItems.reduce(
  (total, item) =>
    total +
    ((item?.card?.info?.price || item?.card?.info?.defaultPrice || 0) / 100) *
      item.quantity,
  0
);

//Payment Handler
const handlePayNow = () => {
  setIsPaying(true);

  setTimeout(() => {
    setIsPaying(false);
    setPaymentSuccess(true);
    dispatch(emptyItem());
  }, 1500);
};


const dispatch = useDispatch();

const handleAddItem = (item) => dispatch(addItem(item));
const handleDecreaseItem = (item) =>
  dispatch(decreaseItemByOne(item?.card?.info?.id));
const handleIncreaseItem = (item) => dispatch(addItem(item));
const emptyCart = () => dispatch(emptyItem());

return (
  <div className={`${theme==="dark" ? "bg-gray-950 text-gray-100 min-h-screen" : "bg-white min-h-screen"}`}>
      
    {/*  Header */}
    {quantity > 0 ? (
      <header className="pt-6 w-[90%] md:w-[70%] mx-auto">
        
        {/* Cart Title */}
        <h1
          className={`font-extrabold text-4xl md:text-6xl pb-2
          border-b-4 w-fit md:w-full
          mx-auto md:mx-0 text-center md:text-center
          ${theme==="dark"
            ? "border-gray-700 text-green-400"
            : "border-black"
          }`}
        >
          Cart
        </h1>

        {/* Clear Cart */}
        <div className="flex justify-center md:justify-start mt-4">
          <button
            className={`px-6 py-2 rounded-xl text-lg font-semibold cursor-pointer 
            active:scale-95 transition
            ${theme==="dark"
              ?"bg-red-600 border border-red-500 text-white hover:bg-red-700"
              :"bg-black text-white border border-black hover:bg-gray-800"}`}
            onClick={emptyCart}
          >
            Clear Cart
          </button>
        </div>

      </header>
    ) : (
      <div className="w-[85%] mx-auto mt-24 text-center">
        <p className={`text-3xl font-semibold ${theme==="dark"?"text-gray-300":"text-gray-600"}`}>
          Your cart is empty
        </p>
        <p className="text-gray-500 mt-2">
          Add some delicious food!
        </p>
      </div>
    )}

    {/*  Items */}
    <div className='mt-10 w-[90%] md:w-[70%] mx-auto'>
      {cartItems?.map((item) => {
        const count = item.quantity;

        return (
          <div
            key={item?.card?.info?.id}
            className={`flex flex-col md:flex-row justify-between gap-6 py-6 border-b transition
            ${theme==="dark"?"border-gray-700":"border-gray-300"}`}
          >
            {/* Info */}
            <div className='flex flex-col items-start w-full md:w-[70%] gap-2'>
              <p className='font-semibold text-lg'>{item?.card?.info?.name}</p>

              <p className={`font-medium flex items-center gap-2
              ${theme==="dark"?"text-green-400":"text-gray-700"}`}>
                <FaRupeeSign />
                {(item?.card?.info?.defaultPrice ?? item?.card?.info?.price) * count / 100}
              </p>

              {item?.card?.info?.ratings?.aggregatedRating?.rating && (
                <span className={`text-sm ${theme==="dark"?"text-yellow-400":"text-gray-600"}`}>
                  ⭐{item?.card?.info?.ratings?.aggregatedRating?.rating}
                </span>
              )}

              <p className={`${theme==="dark"?"text-gray-400":"text-gray-500"} text-sm`}>
                {item?.card?.info?.description}
              </p>
            </div>

            {/* Image + Controls */}
            <div className='flex flex-col items-center md:items-end gap-3'>
              <img
                src={CDN_URL + item?.card?.info?.imageId}
                alt=""
                className='w-28 h-24 md:w-32 md:h-28 object-cover rounded-lg shadow'
              />

              {count === 0 ? (
                <button
                  className={`px-4 py-1 rounded-lg font-semibold shadow-sm active:scale-95 transition
                  ${theme==="dark"
                    ?"text-green-400 border border-green-500 hover:bg-green-500/10"
                    :"text-green-600 border border-green-600 hover:bg-green-50"}`}
                  onClick={() => handleAddItem(item)}
                >
                  Add
                </button>
              ) : (
                <div
                  className={`px-4 py-1 rounded-lg font-semibold shadow-sm flex items-center gap-2 active:scale-95 transition
                  ${theme==="dark"
                    ?"text-green-400 border border-green-500 hover:bg-green-500/10"
                    :"text-green-600 border border-green-600 hover:bg-green-50"}`}
                > 
                  <button onClick={() => handleDecreaseItem(item)}>-</button>
                  <span>{count}</span>
                  <button onClick={() => handleIncreaseItem(item)}>+</button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>

    {paymentSuccess && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className={`p-8 rounded-2xl text-center shadow-xl
          ${theme === "dark" ? "bg-gray-900 text-green-400" : "bg-white text-black"}`}>
          
          <h2 className="text-3xl font-extrabold mb-2">✅ Payment Successful</h2>
          <p className="text-lg mb-4">Your order has been placed 🎉</p>

          <button
            onClick={() => setPaymentSuccess(false)}
            className="mt-4 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500"
          >
            Close
          </button>
        </div>
      </div>
    )}


    {/*  Total */}
    <footer className="mt-10 pb-10">
      {quantity > 0 && (
        <div
          className={`flex flex-col sm:flex-row items-stretch sm:items-center
          justify-between gap-4 p-4 rounded-2xl shadow-lg
          w-[90%] sm:w-[85%] md:w-[60%] mx-auto
          ${theme === "dark"
            ? "bg-gray-800 text-green-400 border border-gray-700"
            : "bg-gray-100 text-black border border-gray-300"
          }`}
        >
          {/* Total */}
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold">Total</h2>
            <span className="text-2xl sm:text-3xl font-extrabold">
              ₹{total_price.toFixed(2)}
            </span>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayNow}
            disabled={isPaying}
            className={`w-full sm:w-auto
            px-6 py-3 sm:py-2
            rounded-xl font-semibold text-lg
            transition active:scale-95
            ${theme === "dark"
              ? "bg-green-600 text-white hover:bg-green-500 disabled:bg-gray-600"
              : "bg-green-600 text-white hover:bg-green-500 disabled:bg-gray-400"
            }`}
          >
            {isPaying ? "Processing..." : "Pay Now"}
          </button>
        </div>        
      )}
    </footer>

  </div>
);
}

export default Cart;



