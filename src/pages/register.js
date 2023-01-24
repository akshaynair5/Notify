import logo from '../logo.png'
import { Link } from 'react-router-dom'

function Register(){
    return(
        <div className="Form">
            <img src={logo} style={{height:'300px',width:'400px',marginLeft:'20%'}}></img>
            <input type="text" placeholder="Name"></input>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <input type='button' value='Register' className="button-35" style={{backgroundColor:'#8B9490'}}></input>
            <div className='Navs' style={{display:'flex',flexDirection:'row'}}>
                <p>Already have an Account? </p>
                <Link to='/Login' style={{color:'black',fontSize:'20px',textDecoration:'none',marginTop: '2.8%',marginLeft:'2%'}}>Click Here to Login</Link>
            </div>
        </div>
    )
}

export default Register