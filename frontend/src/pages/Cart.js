import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext"
import useAxios from "../utils/useAxios";
import { useQuery, QueryClient, useQueryClient } from '@tanstack/react-query'



function Cart() {


    const queryClient = useQueryClient(); 

    const { user } = useContext(AuthContext);
    const first_name = user.full_name.split(' ')[0]
    const [cartProducts, setCartProducts] = useState([]);

    const api = useAxios()

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
    const onClick = async (id) => {
      const response = await api.get(`/carts/product/remove/${id}`);
      
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['get-cart-products'] })
      }
    }

    return (
    <div>{first_name}'s Cart
     {cartProducts && cartProducts.map((product, index) => {
        return <><p id={index}>{product.name} at {((product.price) / 100).toFixed(2)}</p>
        <img src={`http://localhost:8000/${product.image}`} style={{width: 150, height: 150}}></img>
        <img src={`http://localhost:8000/media/ratings/rating-${product.rating * 10}.png`} ></img><p>{product.rating_number}</p>
        <p>{product.category_name}</p><button onClick={() => {onClick(product.product_id)}}>Remove From Cart</button></>
      })}
    </div>
   
  )
}

export default Cart