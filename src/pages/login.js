import { Link } from 'react-router-dom'
import logo from '../logo.png'


function Login(){
    return(
        <div className="Form">
            <img src={logo} style={{height:'300px',width:'400px',marginLeft:'20%'}}></img>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <input type='button' value='SignIn' className="button-35" style={{backgroundColor:'#8B9490'}}></input>
            <div className='Navs' style={{display:'flex',flexDirection:'row'}}>
                <p>Do not have an Account? </p>
                <Link to='/register' style={{color:'black',fontSize:'20px',textDecoration:'none',marginTop: '2.8%',marginLeft:'2%'}}>Click Here to Register</Link>
            </div>
        </div>
    )
}
export default Login