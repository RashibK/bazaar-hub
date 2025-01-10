import useAxios from "../utils/useAxios";

function AddProduct() {

    const api = useAxios()

    const onSubmit = (event) => {
        event.preventDefault();
        addProduct(event);

    }

    const addProduct = async (event) => {
        const response = await api.post('/products/add/',
          {
            "name": event.target.product_name.value, 
            "description": event.target.product_description.value,
            "price": event.target.product_price.value,
            "image": event.target.product_image.files[0]
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            } } )
    }

  return (
    <div>
        <form onSubmit={onSubmit}>
            <label for='product_name'><input id='product_name' placeholder="Product Name" name="product_name" /></label><br></br>
            <label for='product_description'><input type="text" id='product_description' placeholder="Product Description" name="product_description"/></label><br></br>
            <label for='product_price'><input type="number" id='product_price'placeholder="Product Price" name="product Price"/></label><br></br>
            <label for='product_image'><input type="file" accept="image/jpeg,image/png,image/gif" id='product_image' placeholder="Product Image" name="product_image" /></label><br></br>
            <button> Add Product </button>
        </form>
    </div>
  )
}

export default AddProduct   