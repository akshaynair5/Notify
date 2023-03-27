import { useContext, useEffect, useState } from "react"
import { Authcontext } from "../context/authcontext"
import settings from '../imgs/gear.png'
import img from '../imgs/gallery.png'
import { collection, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase_config";
import { getDocs, doc } from "firebase/firestore";

function Chats(){
    const {currentUser} = useContext(Authcontext)
    const eventRef = collection(db,"users")
    const [friends,setFriends] = useState([])
    const Fetchfriend = async()=>{
        const q=query(eventRef,where("uid","==",`${currentUser.uid}`))
        const querySnapShot1 = await getDocs(q)
        const temp = []
        try{
            querySnapShot1.forEach((doc)=>{
                temp.push(doc.data())
            })
            setFriends(temp[0].friends)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        Fetchfriend()
    })
    return(
        <div className="chatbox">
            <div className="chats">
                <div className="Userchats">
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                    <img id="udp" src={currentUser.photoURL}></img>
                </div>
                <div className="Userchats">
                    <img id="img" src={settings}></img>
                    <img id="udp" src={currentUser.photoURL}></img>
                </div>
                <div className="friendchats">
                    <img src={currentUser.photoURL}></img>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                </div>
                <div className="friendchats">
                    <img src={currentUser.photoURL}></img>
                    <img src={settings} style={{borderStyle:'solid',padding:'3%',height:'400px',width:'400px',borderRadius:'25px',marginTop:'0%'}}></img>
                </div>
            </div>
            <div className="textbox">
                <input type="text"></input>
                <input type="file" id="sendPhotos" style={{visibility:'hidden'}}></input>
                <label htmlFor="sendPhotos"><img src={img} style={{height:'50px'}}></img></label>
            </div>
        </div>
    )
}

export default Chats