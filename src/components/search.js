import { signOut } from 'firebase/auth'
import settings from '../imgs/gear.png'
import user from '../imgs/user.png'
import { auth } from '../firebase_config'
import UserInfo from "../components/popup"
import { useState } from 'react'
import { collection, getDoc, query, where } from "firebase/firestore";
import { db } from '../firebase_config'
function Navbar(){
    const [searchFor,setSearch] = useState("")
    const [popupdisplay,setpopup] = useState("hidden")
    const searching = async(e)=>{
        const q = query(collection(db, "users"), where("displayName", "==", searchFor));
        const querySnapShot = await getDoc(q)
        querySnapShot.forEach((doc)=>{
            setSearch(doc.data())
        })
        console.log(searchFor.displayName)
    }
    const handleEnter=(e)=>{
        if(e.code==="Enter"){
            searching()
        }
    }
    const handlePopup1=()=>{
        if(popupdisplay=='hidden'){
            setpopup('visible')
        }
        else if(popupdisplay=='visible'){
            setpopup('hidden')
        }
    }
    return(
        <div className='navbar' style={{display:'flex'}}>
            <img src={user} style={{height:'5%',position:'absolute',left:'3%',top:'3%'}} onClick={()=>handlePopup1()}></img>
            <UserInfo display={popupdisplay} style={{position:'relative'}}/>
            <div className="search">
                <input type='search' onChange={(e)=>setSearch(e.target.value)} style={{height:'6%',position:'absolute',left:'20%',width:'55%',borderRadius:'20px'}} onKeyUp={(e)=>{handleEnter(e)}}></input>
                <input type='button' onClick={()=>searching()} value='Search' style={{position:'absolute',left:'75.5%',height:'6%',borderRadius:'20px'}}></input>
            </div>
            <img src={settings} style={{height:'5%',position:'absolute',left:'97%',top:'3%'}}></img>
        </div>
    )
}

export default Navbar