import { useContext, useEffect, useState } from "react";
import useAxios from "../utils/useAxios"
import axios from "axios";
import { instance } from "../utils/instanceAxios";
import { AuthContext } from "../context/authContext";


function HomePage() {

  const [allproducts, setAllproducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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

    return (
    <div><p>Hey this is the homepage for ecommerce site backend</p>
    <p>Below are all the products in db</p>
    
      {filteredData && filteredData.map((product, index) => {
        return <><p id={index}>{product.name} at {((product.price) / 100).toFixed(2)}</p>
        <img src={`http://localhost:8000/${product.image}`} style={{width: 150, height: 150}}></img>
        <p>{product.category_name}</p></>
      })}
    </div>
  )
}

export default HomePage