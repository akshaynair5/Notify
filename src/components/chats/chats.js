import { useContext, useEffect, useRef, useState } from "react"
import { Authcontext } from "../../context/authcontext"
import settings from '../../imgs/gear.png'
import img from '../../imgs/gallery.png'
import { collection, query, updateDoc, where ,or,and} from "firebase/firestore";
import { db } from "../../firebase_config";
import { getDocs, doc } from "firebase/firestore";
import "./chat.css"

function Chats(){
    const [message,setmessage] = useState("")
    const chatsRef = useRef(null)
    const eventRef = collection(db,"userChat")
    const {currentUser} = useContext(Authcontext)
    const [friendChat,setFChat] = useState([])
    const [FchatId,setFID] = useState([]);
    const {currentfriend,setcf} = useContext(Authcontext)
    const [chatview,setcv] = useState('none')
    const FetchfriendChat = async()=>{
        const q=query(eventRef,or(where("chatId","==",`${currentUser.uid}`+`${currentfriend.uid}`),where("chatId","==",`${currentfriend.uid}`+`${currentUser.uid}`)))
        const querySnapShot1 = await getDocs(q)
        const temp = []
        try{
            querySnapShot1.forEach((doc)=>{
                temp.push(doc.data())
            })
            setFChat(temp[0].text)
            setFID(temp[0])
            console.log(temp)
        }catch(err){
            console.log("error: ",err)
        }
    }
    useEffect(()=>{
        FetchfriendChat()
        document.addEventListener('keydown', (e)=>{
            if (e.key === 'Enter') {
                e.preventDefault()
                    SendMessage()
            }
        });
    },[])
    useEffect(() => {
        if (chatsRef.current) {
            const divElement = chatsRef.current;
            divElement.scrollTo({
              top: divElement.scrollHeight,
              behavior: "smooth",
            });
          }
    }, [friendChat]);
    // useEffect(()=>{
    //     console.log(currentfriend)
    // },[currentfriend])
    // useEffect(()=>{
    //     console.log(friendChat)
    // },[friendChat])
    const SendMessage=async()=>{
        var now = new Date().getTime()
        let temp = friendChat;
        temp = [...temp,{chat:`${message}`,user:`${currentUser.uid}`,timestamp:`${now}`}]
        await updateDoc(doc(db,"userChat",`${FchatId.chatId}`),{
            text:temp
        }).then(()=>{
            console.log("Done")
        })
        FetchfriendChat()
        console.log(message);
        setmessage("")
    }
    return(
        <div className="chatbox">
            <div className="chats" ref={chatsRef}>
                {friendChat &&
                    friendChat.map((chat)=>{
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
                                        <img src={currentfriend.photoURL} id="udp"></img>
                                        <span>{chat.chat}</span>
                                    </div>
                                )
                        }
                    })
                }
            </div>
            <div className="textbox">
                <input type="text" className="Main" onChange={(e)=>{setmessage(e.target.value)}}  value={message} placeholder={'Message friend'}></input>
                <input type="button" className="SendMessage" value="Send" id='snd' onClick={()=>SendMessage()}></input>
                {/* <input type="file" id="sendPhotos" style={{visibility:'hidden'}}></input>
                <label htmlFor="sendPhotos"><img src={img} style={{height:'50px'}}></img></label> */}
            </div>
        </div>
    )
}

export default Chats