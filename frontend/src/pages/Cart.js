import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext"
import useAxios from "../utils/useAxios";
import { useQuery, QueryClient, useQueryClient } from '@tanstack/react-query'
import { Link } from "react-router-dom";
import CheckOut from "./CheckOut";


function Cart() {


    const queryClient = useQueryClient(); 

    const { user } = useContext(AuthContext);
    const first_name = user.full_name.split(' ')[0]
    const [cartProducts, setCartProducts] = useState([]);
    let [totalPrice, setTotalPrice] = useState();
    let original = 0;


    const api = useAxios()

    // gets all products of one cart
    const getProducts = async () => {
      const response = await api.get('carts/get')

      if (response.status === 200) {
        setCartProducts(response.data);
        return response.data;
      }
    }

    const query = useQuery({
      queryKey: ['get-cart-products'],
      queryFn: getProducts,
    })

    
    // removes an item from the cart
    const onClick = async (id, action) => {
      const response = await api.get(`/carts/product/${action}/${id}`);
      
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['get-cart-products'] })
      }
    }

    return (
    <div className="flex ">
      <div className=" m-4">
      <h2 class="text-xl font-semibold text-black-900 sm:text-2xl">Shopping Cart</h2>
        <div>
        {cartProducts && cartProducts.map((product, index) => {
          original += product.price * product.quantity

        return <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div class="space-y-6">
              <div class="rounded-lg border border-black-200 bg-white p-4 shadow-sm">
                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <a href="#" class="shrink-0 md:order-1">
                   <img class="" src={`http://localhost:8000/${product.image}`} style={{width: 150, height: 150}} alt="item" />
                  </a>

                  <label for="counter-input" class="sr-only">Choose quantity:</label>
                  <div class="flex items-center justify-between md:order-3 md:justify-end">
                    <div class="flex items-center">
                      <button onClick={() => onClick(product.product_id, 'decrease')} type="button" id="decrement-button" data-input-counter-decrement="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-black-300 bg-black-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                        <svg class="h-2.5 w-2.5 text-white-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                        </svg>
                      </button>
                      <input type="text" id="counter-input" data-input-counter class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-black-900 focus:outline-none focus:ring-0" placeholder="" value={product.quantity} required />
                      <button onClick={() => onClick(product.product_id, 'increase')} type="button" id="increment-button" data-input-counter-increment="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-black-300 bg-black-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 ">
                        <svg class="h-2.5 w-2.5 text-white-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                    <div class="text-end md:order-4 md:w-32">
                      <p class="text-base font-bold text-black-900">${(((product.price) / 100) * product.quantity).toFixed(2)}</p>
                    </div>
                  </div>

                  <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <p class="text-base font-medium text-black-900">{product.name}</p>

                    <div class="flex items-center gap-4">
                      <button onClick={() => {onClick(product.product_id, 'remove')}} type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                        <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </div>
              </div> 
        })}
        </div>
      
      </div>
            <div className="mx-auto mt-6 max-w-4xl  space-y-6 lg:mt-0 lg:w-full">
              <div class="space-y-4 rounded-lg border border-black-200 bg-white p-4 shadow-sm sm:p-6 m-4">
              <p class="text-xl font-semibold text-black-900 sm:text-2xl">Order summary</p>
              <div class="space-y-4">
              <div class="space-y-2">
                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-black-500">Original price</dt>
                  <dd class="text-base font-medium text-black-900">${(original / 100).toFixed(2)}</dd>
                </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-black-500 ">Savings</dt>
                <dd class="text-base font-medium text-green-600">-$0.00</dd>
              </dl>
            </div>

            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt class="text-base font-bold text-black-900">Total (taxes may be applicable at the chekout)</dt>
              <dd class="text-base font-bold text-black-900">${(original / 100).toFixed(2)}</dd>
            </dl>
          </div>
          <a href='/users/cart/checkout' class="flex w-full items-center justify-center rounded-lg bg-yellow-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-primary-300 ">Proceed to Checkout</a>
              </div>
              </div>

      
      </div>
  )
}

export default Cart


// {first_name}'s Cart
//      {cartProducts && cartProducts.map((product, index) => {
//         return <><p id={index}>{product.name} at {((product.price) / 100).toFixed(2)}</p>
//         <img src={`http://localhost:8000/${product.image}`} style={{width: 150, height: 150}}></img>
//         <img src={`http://localhost:8000/media/ratings/rating-${product.rating * 10}.png`} ></img><p>{product.rating_number}</p>
//         <p>{product.category_name}</p><p>Quantity: {product.quantity}</p><button onClick={() => onClick(product.product_id, 'increase')}>Increase</button><button onClick={() => onClick(product.product_id, 'decrease')}>Decrease</button><button onClick={() => {onClick(product.product_id, 'remove')}}>Remove From Cart</button></>
//       })}

//       {cartProducts && <Link to='/users/cart/checkout'> Checkout </Link>}