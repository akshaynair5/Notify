import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo from '../imgs/logo.png'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase_config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext,useState } from 'react';

function Login(){
    const [err,setErr] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/home")

        }catch(error){
            setErr(true)
        }

    }
    return(
        <form className="Form" onSubmit={(e)=>handleSubmit(e)}>
            <img src={logo} ></img>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <input type='submit' value='SignIn' className="button-35" style={{backgroundColor:'#8B9490'}}></input>
            <div className='Navs' style={{display:'flex',flexDirection:'row'}}>
                <p >Do not have an Account? </p>
                <p><Link to='/register'>Click Here to Register</Link></p>
            </div>
        </form>
    )
}
export default Login