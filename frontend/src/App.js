import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import PrivateRoutes from './utils/PrivateRoute';
import { AuthProvider } from './context/authContext';


function App() {
  return (
    <div className="App">
     <Router>
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<HomePage />} exact/>
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      </AuthProvider>
     </Router>
    </div>
  );
}

export default App;
