import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import PrivateRoutes from './utils/PrivateRoute';
import { AuthContext, AuthProvider } from './context/authContext';
import AddProduct from './pages/AddProduct';
import FilteredPage from './components/FilteredPage';
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import Cart from './pages/Cart';


function App() {



  function AppContext() {


    const [ searchParams, setSearchParams ] = useSearchParams(); 
    const searchTerm = searchParams.get('search')


    return <>
      <Navbar />
      <Routes>
      { !searchTerm ? <Route path='/' element={<HomePage />} exact/> : <Route path='/' element={<FilteredPage />}/>}
      
        <Route element={<PrivateRoutes />}>
            <Route path='/products/add' element={<AddProduct />} />
            <Route path='/users/profile' element={<UserProfile />} />
            <Route path='/users/cart' element={<Cart />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        
      </Routes>
      </>

  }

  return (
    <div className="App">
     <Router>
      <AuthProvider>
      <AppContext />
      </AuthProvider>
     </Router>
    </div>
  );
}

export default App;
