import { signOut } from 'firebase/auth'
import settings from '../imgs/gear.png'
import user from '../imgs/user.png'
import { auth } from '../firebase_config'
import UserInfo from "../components/popup"
import { useState } from 'react'

function Navbar(){
    const [popupdisplay,setpopup] = useState("none")
    const handlePopup1=()=>{
        if(popupdisplay=='none'){
            setpopup('contents')
        }
        else if(popupdisplay=='contents'){
            setpopup('none')
        }
    }
    return(
        <div className='navbar'>
            <img src={user} style={{height:'5%',position:'absolute',left:'3%',top:'3%'}} onClick={()=>handlePopup1()}></img>
            <UserInfo display={popupdisplay} style={{position:'relative'}}/>
            <div className="search">
                <input type='search' style={{height:'6%',position:'absolute',left:'20%',width:'55%',borderRadius:'20px'}}></input>
                <input type='button' value='Search' style={{position:'absolute',left:'75.5%',height:'6%',borderRadius:'20px'}}></input>
            </div>
            <img src={settings} style={{height:'5%',position:'absolute',left:'97%',top:'3%'}}></img>
        </div>
    )
}

export default Navbar