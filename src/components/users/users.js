import { collection, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase_config";
import { getDocs, doc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react"
import { Authcontext } from "../../context/authcontext"
import './users.css'
function Users(){
    const {currentUser} = useContext(Authcontext)
    const windowWidth = window.innerWidth
    const eventRef = collection(db,"users")
    const [friends,setFriends] = useState([])
    const {currentfriend,setcf} = useContext(Authcontext)
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
    },[])
    // useEffect(()=>{
    // },[currentfriend])
    const setCurrentfriend = async (friends)=>{
        console.log(friends)
        try{
            await updateDoc(doc(db,"users",`${currentUser.uid}`),{
                currentfriend:friends,
            })
        }catch(err){
            console.log(err)
        }
        setcf(friends);
    }
    return(
        <>
            {
                windowWidth > 768 && 
                <div className='users' style={{position:'fixed',top:'10%'}}>
                {
                        friends.map((friend)=>(
                            <>
                                {
                                    friend.uid == currentfriend.uid && 
                                    <div className='usertabCurrent' onClick={()=>setCurrentfriend(friend)}>
                                        <img src={friend.photoURL}></img>
                                        <p>{friend.name}</p>
                                    </div>
                                }
                                {
                                    friend.uid != currentfriend.uid && 
                                    <div className='usertab' onClick={()=>setCurrentfriend(friend)}>
                                        <img src={friend.photoURL}></img>
                                        <p>{friend.name}</p>
                                    </div>
                                }
                            </>
                        ))
                }
                </div>
            }
            {windowWidth <= 768 && 
                <div className='usersMob' style={{position:'fixed',top:'10%'}}>
                {
                        friends.map((friend)=>(
                            <>
                                {
                                    friend.uid == currentfriend.uid && 
                                    <div className='usertabCurrent' onClick={()=>setCurrentfriend(friend)}>
                                        <img src={friend.photoURL}></img>
                                    </div>
                                }
                                {
                                    friend.uid != currentfriend.uid && 
                                    <div className='usertab' onClick={()=>setCurrentfriend(friend)}>
                                        <img src={friend.photoURL}></img>
                                    </div>
                                }
                            </>
                        ))
                }
                </div>
            }
        </>
    )
}

export default Users

// style={{position:'static',height:'90%'}}