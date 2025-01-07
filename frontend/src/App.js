import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import PrivateRoute from './utils/PrivateRoute';


function App() {
  return (
    <div className="App">
     <Router>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<HomePage />} exact/>
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
