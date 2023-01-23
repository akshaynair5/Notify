import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/home'
import Register from './pages/register';
import Login from './pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/Login" element={<Login/>}></Route>
        <Route exact path="/Register" element={<Register/>}></Route>
        <Route exact path="/home" element={<Home/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
