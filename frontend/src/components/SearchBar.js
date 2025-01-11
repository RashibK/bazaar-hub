import { useContext } from "react"
import { AuthContext } from "../context/authContext"


function SearchBar() {
    
    const {search, setSearch} = useContext(AuthContext);

    const onChange = (event) => {

    }

    const onSubmit = (event) => {
        // event.preventDefault();
        setSearch(event.target.search.value)
        console.log(event.target.search.value)
    }
  return (
    <div><form onSubmit={onSubmit}>
        <label for='search'></label>
        <input type='text' id='search' name='search'></input>
        <button> Search </button>
        </form>
        </div>
  )
}

export default SearchBar