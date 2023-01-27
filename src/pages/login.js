import { Link } from 'react-router-dom'
import logo from '../imgs/logo.png'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase_config';


function Login(){
    const handleSubmit =(e)=>{
        const email = e.target[0].value
        const password = e.target[1].value
        const name = e.target[2].value
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }
    return(
        <form className="Form" onSubmit={(e)=>handleSubmit(e)}>
            <img src={logo} style={{height:'300px',width:'400px',marginLeft:'20%'}}></img>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <input type='submit' value='SignIn' className="button-35" style={{backgroundColor:'#8B9490'}}></input>
            <div className='Navs' style={{display:'flex',flexDirection:'row'}}>
                <p>Do not have an Account? </p>
                <Link to='/register' style={{color:'black',fontSize:'20px',textDecoration:'none',marginTop: '2.8%',marginLeft:'2%'}}>Click Here to Register</Link>
            </div>
        </form>
    )
}
export default Login