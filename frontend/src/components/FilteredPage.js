import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext"
import { useSearchParams } from "react-router-dom";
import { instance } from "../utils/instanceAxios";

function FilteredPage() {

    const [allproducts, setAllproducts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [ searchParams, setSearchParams ] = useSearchParams();
    const keywords = searchParams.get('search') || '';


   useEffect(() => {
    fetchData();
   }, [])

  const fetchData = async () => {
    const response = await instance.get('/products/list');
    
    if (response.status === 200) {
      setAllproducts(response.data);
    }
  }  

  useEffect(() => {
    const filterData = () => {
        setFilteredData(allproducts.filter((product) => {
            if (keywords === '') {
                return true
            }
            else {
                const word = product.name.toLowerCase().split(' ');
                return word.includes(keywords.toLowerCase());
            } 
        }))
      }
      filterData();
  }, [allproducts, keywords])
  

    return <>
        Here are your search results: 
        {filteredData ? filteredData.map((product, index) => {
        return <>
        <p key={index}>{product.name} at {((product.price) / 100).toFixed(2)}</p>
        <img src={`http://localhost:8000/${product.image}`} style={{width: 150, height: 150}}></img>
        <p>{product.category_name}</p>
        </> }) : <p>Loading...</p>}
        </>
        }

export default FilteredPage