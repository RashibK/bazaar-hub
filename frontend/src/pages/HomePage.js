import { useContext, useEffect, useState } from "react";
import useAxios from "../utils/useAxios"
import axios from "axios";
import { instance } from "../utils/instanceAxios";
import { AuthContext } from "../context/authContext";


function HomePage() {

  const [allproducts, setAllproducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const api = useAxios();

   useEffect(() => {
    fetchData();
   }, [])

  const fetchData = async () => {
    const response = await instance.get('/products/list');
    
    if (response.status === 200) {
      setAllproducts(response.data);
      setFilteredData(response.data);

    }
  }  

  const onChange = (event) => {
    // event.target.value - > search term 
      setFilteredData(allproducts.filter((product, index) => {
        if (event.target.value.toLowerCase() == ''){
          return true 
        }
        else product.name.toLowerCase().split(' ').includes(event.target.value.toLowerCase())
      }))
  }

  // # for adding a product to user's cart
  const onClick = (id) => {
    const response = api.post(`/carts/post/${id}`)
    
    if ( response.method == 201) {
      alert('Added to cart')
    }
    
  }
    return (
    <div><p>Hey this is the homepage for ecommerce site backend</p>
    <p>Below are all the products in db</p>
    
      {filteredData && filteredData.map((product, index) => {
        return <><p id={index}>{product.name} at {((product.price) / 100).toFixed(2)}</p>
        <img src={`http://localhost:8000/${product.image}`} style={{width: 150, height: 150}}></img>
        <img src={`http://localhost:8000/media/ratings/rating-${product.rating * 10}.png`} ></img><p>{product.rating_number}</p>
        <p>{product.category_name}</p><button onClick={() => onClick(product.id)}>Add to Cart</button></>
      })}
    </div>
  )
}

export default HomePage