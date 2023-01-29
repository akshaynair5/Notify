import { signOut } from 'firebase/auth'
import settings from '../imgs/gear.png'
import user from '../imgs/user.png'
import { auth } from '../firebase_config'
import UserInfo from "../components/popup"
import { useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase_config'
function Navbar(){
    const [searchFor,setSearch] = useState("")
    const [username,setUser] = useState(null)
    const [popupdisplay,setpopup] = useState("hidden")
    const [Err,setErr] = useState(false)
    const searching = async(e)=>{
        const q = query(collection(db, "users"), where("displayName", "==", searchFor));
        const querySnapShot = await getDocs(q)
        try{
            querySnapShot.forEach((doc)=>{
                setUser(doc.data())
            })
        }catch(err){
            setErr(true)
        }
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
        <div className='navbar' style={{display:'flex',position:'fixed'}}>
            <img src={user} onClick={()=>handlePopup1()}></img>
            <UserInfo display={popupdisplay} style={{position:'relative'}}/>
            <div className="search" style={{width:'85%',height:'100%'}}>
                <input type='search' onChange={(e)=>setSearch(e.target.value)}  style={{height:'20%',position:'absolute',left:'20%',width:'55%',borderRadius:'20px'}} onKeyUp={(e)=>{handleEnter(e)}}></input>
                <input type='button' onClick={()=>searching()} value='Search' style={{position:'absolute',left:'75.5%',height:'6%',borderRadius:'20px'}}></input>
                {username && <div className="searchRes" style={{backgroundColor:'white',display:'flex',width:'51%',height:'fit-content',padding:'2%',position:'absolute',left:'50%',top:'120%',zIndex:'3',textAlign:'right'}} >
                    <img src={username.PhotoURL}></img>
                    <p>{username.displayName}</p>
                </div>}
                {Err && <div className='searchRes'>
                    <p>User not found</p>
                </div>}
            </div>
            <img src={settings}></img>
        </div>
    )
}

export default Navbar