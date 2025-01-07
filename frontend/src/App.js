import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages/HomePage';


function App() {
  return (
    <div className="App">
     <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} exact/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
