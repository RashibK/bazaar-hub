import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function AddProduct() {


    const api = useAxios()
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(Number(event.target.category.value))
        addProduct(event);
    }

    const addProduct = async (event) => {
        const response = await api.post('/products/add/',
          {
            "name": event.target.product_name.value, 
            "price": event.target.product_price.value,
            "image": event.target.product_image.files[0],
            "category": Number(event.target.category.value)
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            } } )
            if (response.status === 201) {
              navigate('/');
            }
    }

  return (
    <div>
      
        <form onSubmit={onSubmit}>
            <label for='product_name'><input id='product_name' placeholder="Product Name" name="product_name" /></label><br></br>
            <label for='product_price'><input type="number" id='product_price'placeholder="Product Price" name="product Price"/></label><br></br>
            <label for='product_image'><input type="file" accept="image/jpeg,image/png,image/gif" id='product_image' placeholder="Product Image" name="product_image" /></label><br></br>
            <label for="category">Choose a Category:</label>

              <select id="category">
                <option  >Electronics & Gadgets</option>
                <option name="ELECTRONICS_AND_GADGETS" value='1'>Electronics & Gadgets</option>
                <option name="FASHION" value="2" >Fashion</option>
                <option name="HOME_AND_FURNITURE" value="3" >Home & Furniture</option>
                <option name="BEAUTY_AND_PERSONAL_CARE" value="4" >Beauty & Personal Care</option>
                <option name="HEALTH_AND_WELLNESS" value="5" >Health & Wellness</option>
                <option name="GROCERY_AND_ESSENTIALS" value="6" >Grocery & Essentials</option>
                <option name="SPORTS_AND_OUTDOORS" value="7" >Sports & Outdoors</option>
                <option name="BOOKS_MUSIC_AND_STATIONARY" value="8" >Books, Music, & Stationer</option>
                <option name="TOYS_AND_HOBBIES" value="9" >Toys & Hobbies</option>
                <option name="AUTOMOTIVE" value="10" >Automotive</option>
                <option name="INDUSTRIAL_AND_BUSINESS_SUPPLIES" value="11" >Industrial & Business Supplies</option>
                <option name="TRAVEL_AND_LUGGAGE" value="12" >Travel & Luggage</option>
                <option name="ART_AND_COLLECTIBLES" value="13" >Art & Collectibles</option>
              </select>
              <br></br>
            <button> Add Product </button>
        </form>
    </div>
  )
}

export default AddProduct;