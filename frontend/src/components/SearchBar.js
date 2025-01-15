import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import SearchIcon from "../assets/SearchIcon";


function SearchBar() {
    
    const {search, setSearch} = useContext(AuthContext);

    const onSubmit = (event) => {
      // event.preventDefault();
      setSearch(event.target.search.value)
      console.log(event.target.search.value)
    }
    return (
    <div>
      <form className='flex bg-wheat px-1 rounded-sm items-center justify-center border-solid border border-black ' onSubmit={onSubmit} >
      <label for='search'></label>
    <input type='text' id='search' name='search' placeholder="Search a product" className="outline-none p-1.5 w-11/12"></input>
      <button><SearchIcon className='cursor-pointer'/></button>
      </form>
      </div>
    )

}


export default SearchBar


// const onSubmit = (event) => {
//   // console.log(event.target.search.value)
//   //   setSearch(event.target.search.value)
//   //   console.log(event.target.search.value)
// }

// const handleSearchIconClick = () => {
//   onSubmit();
// }

// return (
// <div className="bg-white">


// <form className="flex" onSubmit={onSubmit}>   
// <label for='search'></label>
//     <input type='text' id='search' name='search' onChange={(e) => {setSearch(e.target.value)}}></input>
//     <SearchIcon className='cursor-pointer' onClick={handleSearchIconClick} />
// </form>


//     </div>
// )