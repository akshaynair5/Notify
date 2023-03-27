import { useContext, useEffect, useState } from "react"
import { Authcontext } from "../../context/authcontext"
import settings from '../../imgs/gear.png'
import img from '../../imgs/gallery.png'
import { collection, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase_config";
import { getDocs, doc } from "firebase/firestore";
import "./chat.css"

function Chats(){
    const {currentUser} = useContext(Authcontext)
    const [message,setmessage] = useState("")
    const eventRef = collection(db,"userChat")
    const [friendChat,setFChat] = useState([])
    const {currentfriend,setcf} = useContext(Authcontext)
    const Fetchfriend = async()=>{
        const q=query(eventRef,where("chatId","==",`${currentUser.uid}`+`${currentfriend.uid}`||`${currentfriend.uid}`+`${currentUser.uid}`))
        const querySnapShot1 = await getDocs(q)
        const temp = []
        try{
            querySnapShot1.forEach((doc)=>{
                temp.push(doc.data())
            })
            setFChat(temp[0].friends)
        }catch(err){
            console.log(err)
        }
        console.log(currentfriend)
    }
    useEffect(()=>{
        Fetchfriend()
    })
    useEffect(()=>{

    },[friendChat])
    const SendMessage=async()=>{
        // let temp = friendChat.text
        // temp = [...temp,{createdAt: firebase.firestore.FieldValue.serverTimestamp(),chat:`${message}`,user:`${currentUser.uid}`}]
        // await set
    }
    return(
        <div className="chatbox">
            <div className="chats">
                <div className="Userchats">
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                    <img id="udp" src={currentUser.photoURL}></img>
                </div>
                <div className="friendchats">
                    <img src={currentfriend.friends.photoURL}></img>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                </div>
            </div>
            <div className="textbox">
                <input type="text" className="Main" onChange={(e)=>{setmessage(e.target.value)}}></input>
                <input type="button" className="SendMessage" value="Send" onClick={()=>SendMessage()}></input>
                <input type="file" id="sendPhotos" style={{visibility:'hidden'}}></input>
                <label htmlFor="sendPhotos"><img src={img} style={{height:'50px'}}></img></label>
            </div>
        </div>
    )
}

export default Chats