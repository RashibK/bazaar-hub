import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext"
import { useNavigate, useSearchParams } from "react-router-dom";
import { instance } from "../utils/instanceAxios";
import useAxios from "../utils/useAxios";

function FilteredPage() {

    const [allproducts, setAllproducts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const api = useAxios();

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
  
  // # for adding a product to user's cart
  const onClick = (id) => {
    if (!user) {
      navigate('/login');
    }
    else {
      const response = api.post(`/carts/post/${id}`)
    
      if ( response.method == 201) {
        alert('Added to cart')
      }
      
    }

  }

    return <>
        <p className="text-2xl">Here are your search results:</p>
        {filteredData ? <div className="max-w-7xl mx-auto mt-2.5">
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 ">
{filteredData.map((product, index) => {
  return <div className=" flex flex-col justify-between">
    
    <div className="flex justify-center items-center"> <img src={`http://localhost:8000/${product.image}`} style={{width: 150, height: 150}}></img></div>
    <div className="flex gap-1.5 flex-col justify-between">
      <div className="">
      <p id={index} className="font-bold">{product.name}</p>
    <div className="flex justify-center items-center gap-1">
    <img className='w-16 ' src={`http://localhost:8000/media/ratings/rating-${product.rating * 10}.png`}></img>
    <p className="text-sm pt-0.5">{product.rating_number}</p>
    </div>
    <p className="font-semibold">${((product.price) / 100).toFixed(2)}</p>
        </div>
    <button className='bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-9/12 m-auto' onClick={() => onClick(product.id)}>Add to Cart</button>
    </div>
  </div>
})}
</div>
</div>

 : <p>Loading...</p>}
        </>
        }

export default FilteredPage




// {filteredData ? filteredData.map((product, index) => {
//   return <>
//   <p key={index}>{product.name} at {((product.price) / 100).toFixed(2)}</p>
//   <img src={`http://localhost:8000/${product.image}`} style={{width: 150, height: 150}}></img>
//   <p>{product.category_name}</p>
//   </> })