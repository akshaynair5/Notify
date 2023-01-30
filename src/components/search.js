import { signOut, updateCurrentUser } from 'firebase/auth'
import settings from '../imgs/gear.png'
import user from '../imgs/user.png'
import { auth } from '../firebase_config'
import UserInfo from "../components/popup"
import { useContext, useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase_config'
import { Authcontext } from '../context/authcontext'
function Navbar(){
    const {currentUser} = useContext(Authcontext)
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
    const handleChoice=()=>{
        setUser(null)
        setSearch("")
    }
    return(
        <div className='navbar' style={{display:'flex',position:'fixed'}}>
            <img src={currentUser.photoURL} onClick={()=>handlePopup1()}></img>
            <UserInfo display={popupdisplay}/>
            <div className="search" style={{width:'80%',height:'100%'}}>
                <input type='search' onChange={(e)=>setSearch(e.target.value)}  style={{height:'60%',position:'absolute',left:'20%',width:'55%',borderRadius:'20px'}} onKeyUp={(e)=>{handleEnter(e)}} placeholder="Search for a User" value={searchFor}></input>
                <input type='button' onClick={()=>searching()} value='Search' style={{position:'absolute',left:'75.5%',height:'60%',borderRadius:'20px'}}></input>
                {username && <div className="searchRes" onClick={()=>handleChoice()} style={{backgroundColor:'white',display:'flex',width:'71%',height:'160%',padding:'2%',position:'relative',left:'-5%',top:'140%',zIndex:'3',textAlign:'right',display:'flex',borderRadius:'30px'}} >
                    <img src={username.photoURL} style={{height:'130%'}}></img>
                    <p style={{fontSize:'150%'}}>{username.displayName}</p>
                </div>}
                {Err && <div className='searchRes'>
                    <p>User not found</p>
                </div>}
            </div>
            <img style={{left:'80%',position:'relative',left:'90%'}} src={settings}></img>
        </div>
    )
}

export default Navbar