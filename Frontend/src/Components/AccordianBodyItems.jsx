import React, { useState, useContext } from 'react'
import { FaRupeeSign } from "react-icons/fa6";
import { CDN_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, decreaseItemByOne } from '../utils/Store/cartSlice';
import { Theme } from '../Contexts/ThemeContext';

const AccordianBodyItems = ({ items }) => {

  const { theme } = useContext(Theme);
  const [openItemId, setOpenItemId] = useState(null);

  const cartItems = useSelector(store => store.cart.items);
  const dispatch = useDispatch();

  const handleAddItem = (item) => dispatch(addItem(item));
  const handleDecreaseItem = (item) => dispatch(decreaseItemByOne(item?.card?.info?.id));
  const handleIncreaseItem = (item) => dispatch(addItem(item));

  return (
    <div>
      {items?.map((item) => {

        const cartItem = cartItems.find(i => i?.card?.info?.id === item?.card?.info?.id);
        const count = cartItem ? cartItem.quantity : 0;

        return (
          <div
            key={item?.card?.info?.id}
            className={`flex flex-col md:flex-row justify-between gap-5 md:gap-6 py-6 border-b transition
              ${theme === "dark" ? "border-gray-700 text-gray-200" : "border-gray-300"}`}
          >

            {/* Info */}
            <div className='flex flex-col items-start w-full md:w-[70%] gap-1'>
              <p className={`font-semibold text-base md:text-lg ${theme === "dark" ? "text-white" : ""}`}>
                {item?.card?.info?.name}
              </p>

              <p className={`font-medium flex items-center gap-2 ${theme === "dark" ? "text-green-400" : "text-gray-700"}`}>
                <FaRupeeSign />
                {((item?.card?.info?.defaultPrice ?? item?.card?.info?.price)) / 100}
              </p>

              {item?.card?.info?.ratings?.aggregatedRating?.rating && (
                <span className={`text-sm ${theme === "dark" ? "text-yellow-400" : "text-gray-600"}`}>
                  ⭐{item?.card?.info?.ratings?.aggregatedRating?.rating}
                  ({item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2 || "0"})
                </span>
              )}

              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-sm md:text-base`}>
                {item?.card?.info?.description || "No Description Available"}
              </p>
            </div>

            {/* Image + Button */}
            <div className='flex flex-col items-center gap-2 md:items-end'>

              <img
                src={CDN_URL + item?.card?.info?.imageId}
                alt=""
                className='w-28 h-24 md:w-32 md:h-28 object-cover rounded-lg cursor-pointer hover:scale-105 transition'
                onClick={() => setOpenItemId(openItemId === item?.card?.info?.id ? null : item?.card?.info?.id)}
              />

              {count === 0 ? (
                <button
                  className={`px-4 py-1 rounded-lg font-semibold shadow-sm active:scale-95 transition
                    ${theme === "dark"
                      ? "text-green-400 border border-green-500 hover:bg-green-500/10"
                      : "text-green-600 border border-green-600 hover:bg-green-50"}`}
                  onClick={() => handleAddItem(item)}
                >
                  Add
                </button>
              ) : (
                <div className={`px-4 py-1 rounded-lg font-semibold shadow-sm flex items-center active:scale-95 transition
                  ${theme === "dark"
                    ? "text-green-400 border border-green-500 hover:bg-green-500/10"
                    : "text-green-600 border border-green-600 hover:bg-green-50"}`}>
                  <button onClick={() => handleDecreaseItem(item)}>-</button>
                  <span className="mx-2">{count}</span>
                  <button onClick={() => handleIncreaseItem(item)}>+</button>
                </div>
              )}
            </div>

            {/* ================= MODAL ================= */}
            {openItemId === item?.card?.info?.id && (
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

                <div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setOpenItemId(null)}
                ></div>

                <div className={`relative w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-fadeIn
                  ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white"}`}>

                  <button
                    className={`absolute top-3 right-3 rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer transition
                      ${theme === "dark"
                        ? "bg-gray-800 text-white hover:bg-red-600"
                        : "bg-white text-black hover:bg-red-500"}`}
                    onClick={() => setOpenItemId(null)}
                  >
                    ✕
                  </button>

                  <img
                    src={CDN_URL + item?.card?.info?.imageId}
                    alt=""
                    className="w-full h-56 md:h-64 object-cover"
                  />

                  <div className="p-5 space-y-3">
                    <h2 className="text-lg md:text-xl font-bold">{item?.card?.info?.name}</h2>

                    <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {item?.card?.info?.description || "No description available"}
                    </p>

                    <div className="flex justify-between items-center pt-2">
                      <span className="font-semibold text-lg">
                        ₹{((item?.card?.info?.defaultPrice ?? item?.card?.info?.price)) / 100}
                      </span>
                      {item?.card?.info?.ratings?.aggregatedRating?.rating && (
                        <span className="text-sm text-yellow-400">
                          ⭐{item?.card?.info?.ratings?.aggregatedRating?.rating}
                        </span>
                      )}
                    </div>

                    <div className='flex items-center justify-center'>
                      {count === 0 ? (
                        <button
                          className="w-32 h-10 text-green-400 border border-green-500 rounded-lg font-semibold hover:bg-green-500/10 active:scale-95"
                          onClick={() => handleAddItem(item)}
                        >
                          Add
                        </button>
                      ) : (
                        <div className="w-32 h-10 flex items-center justify-between text-green-400 border border-green-500 rounded-lg font-semibold hover:bg-green-500/10 active:scale-95 px-2">
                          <button onClick={() => handleDecreaseItem(item)}>-</button>
                          <span>{count}</span>
                          <button onClick={() => handleIncreaseItem(item)}>+</button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AccordianBodyItems;



