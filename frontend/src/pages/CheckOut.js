import { useCallback, useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";


import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)


function CheckOut() {
  
  const [clientSecret, setClientSecret] = useState();

  const queryClient = useQueryClient(); 


  const api = useAxios()
  const [cartProducts, setCartProducts] = useState([]);

  // gets all products of one cart
  const getProducts = async () => {
    const response = await api.get('carts/get')

    if (response.status === 200) {
      setCartProducts(response.data);
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


      const fetchClientSecret = async () => {
        const response = await api.post('/carts/product/create-session/', {})
        if (response.status == 200) {
          setClientSecret(response.data.clientSecret);
        }
      }

      useEffect(() => {
        fetchClientSecret(); 
      }, [])
    

    if (!clientSecret) {
      return <p>Loading... </p>;
    }

  return (

    <div id="checkout">
 <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{clientSecret}}
      >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
    </div>
        

  )
}

export default CheckOut 