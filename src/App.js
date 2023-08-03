import './App.css';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import Home from './pages/home'
import Register from './pages/register';
import Login from './pages/login';
import { useContext } from 'react';
import { Authcontext } from './context/authcontext';

function App() {
  const {currentUser} = useContext(Authcontext)
  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return(
        <Navigate to="/Notify"/>
      )
    }
    return(
      children
    )
  }
  return (
    <BrowserRouter basename = "/Notify">
      <Routes>
        <Route exact path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route exact path="/Notify" element={<Login/>}></Route>
        <Route exact path="/Register" element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
