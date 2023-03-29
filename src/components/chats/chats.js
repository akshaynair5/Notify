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
    const [friendChat,setFChat] = useState([{text:[],photos:[],user:''}])
    const {currentfriend,setcf} = useContext(Authcontext)
    const FetchfriendChat = async()=>{
        const q=query(eventRef,where("chatId","==",`${currentUser.uid}`+`${currentfriend.uid}`||`${currentfriend.uid}`+`${currentUser.uid}`))
        const querySnapShot1 = await getDocs(q)
        const temp = []
        try{
            querySnapShot1.forEach((doc)=>{
                temp.push(doc.data())
            })
            setFChat(temp[0])
            console.log(temp)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        FetchfriendChat()
    })
    // useEffect(()=>{
    //     console.log(currentfriend)
    // },[currentfriend])
    const SendMessage=async()=>{
        console.log(friendChat)
        let temp = friendChat.text
        temp = [...temp,{chat:`${message}`,user:`${currentUser.uid}`}]
        await updateDoc(doc(db,"userChat",`${currentUser.uid}`+`${currentfriend.uid}`||`${currentfriend.uid}`+`${currentUser.uid}`),{
            text:temp
        }).then(()=>{
            console.log("Hii")
        })
    }
    return(
        <div className="chatbox">
            <div className="chats">
                {
                    friendChat.text.map((chat)=>{
                        if(chat.user==`${currentUser.uid}`){
                            return(
                                <div className="Userchats">
                                    <span>{chat.chat}</span>
                                    <img id="udp" src={currentUser.photoURL}></img>
                                </div>
                            )
                        }
                        else if(chat.user==`${currentfriend.uid}`){
                                return(
                                    <div className="friendchats">
                                        <img src={currentfriend.friends.photoURL}></img>
                                        <span>{chat.chat}</span>
                                    </div>
                                )
                        }
                    })
                }
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