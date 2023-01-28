import { Authcontext } from "../context/authcontext"
import { useContext } from "react"
import { auth } from "../firebase_config"
import { signOut } from "firebase/auth"
function UserInfo(prop){
    const {currentUser} = useContext(Authcontext)
    const handleClose=()=>{
        document.getElementById("popup1").style.display="none"
    }
    return(
        <div className="popup" id="popup1" style={{display:prop.display}}>
            <input type="button" onClick={()=>signOut(auth)} value="Logout"></input>
            <input onClick={()=>{handleClose()}}  type="button" value="X"></input>
            {/* <img src={currentUser.photoURL} ></img> */}
            <p>{currentUser.displayName}</p>
        </div>
    )
}

export default UserInfo