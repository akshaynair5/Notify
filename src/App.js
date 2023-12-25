import './App.css';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import Home from './pages/home'
import Register from './pages/register';
import Login from './pages/login';
import { useContext,useEffect } from 'react';
import { Authcontext } from './context/authcontext';

function App() {
  const {currentUser} = useContext(Authcontext)

  useEffect(()=>{
    console.log(currentUser)
  },[currentUser])
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
    <BrowserRouter >
      <Routes basename = "/Notify">
        <Route  path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route  path="/Notify" element={<Login/>}></Route>
        <Route  path="/Register" element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
