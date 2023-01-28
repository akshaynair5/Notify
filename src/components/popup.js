import { Authcontext } from "../context/authcontext"
import { useContext } from "react"
import { auth } from "../firebase_config"
import { signOut } from "firebase/auth"
import user from '../imgs/user.png'
function UserInfo(prop){
    const {currentUser} = useContext(Authcontext)
    const handleClose=()=>{
        document.getElementById("popup1").style.visibility="hidden"
    }
    return(
        <div className="popup" id="popup1" style={{visibility:prop.display,width:'15%',height:'900%',backgroundColor:'white',position:'relative',top:'150%',zIndex:'3',padding:'2%',borderRadius:'20px',left:'1%',paddingLeft:'3%',paddingRight:'3%'}}>
            <img src={user} style={{height:'40%'}}></img>
            <input onClick={()=>{handleClose()}}  type="button" value="X" style={{position:'absolute',left:'90%',backgroundColor:'transparent',border:'none',fontSize:'25px',cursor:'pointer'}}></input>
            <p style={{fontSize:'200%'}}>{currentUser.displayName}</p>
            <p style={{fontSize:'150%'}}>{currentUser.email}</p>
            <input type="button" onClick={()=>signOut(auth)} value="Logout" style={{backgroundColor:'red',padding:'2%',border:'none',borderRadius:'20px',fontSize:'200%',position:'absolute',bottom:'10%'}}></input>
        </div>
    )
}

export default UserInfo