import { useContext, useEffect, useState } from "react"
import { Authcontext } from "../../context/authcontext"
import { auth } from "../../firebase_config";
import { collection, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase_config";
import { getDocs, doc ,setDoc,addDoc} from "firebase/firestore";
import noRes from '../../imgs/no-results.png'
import searchIcon from '../../imgs/Iconsax.svg'
import noti from '../../imgs/noti.svg'
import add from '../../imgs/add.svg'
import "./Navbar.css"
import { signOut } from "firebase/auth";

function Navbar(){
    const [Search,setSearch] = useState("")
    const [SUserDetails,setUDetails] = useState([])
    const [SVis,setSVis] = useState(false)
    const {currentUser} = useContext(Authcontext)
    const [authState,setAS] = useState(false)
    const userRef = collection(db,"users")
    const {currentfriend,setcf} = useContext(Authcontext)
    const [currentUserDetails,setCUD] = useState([]);
    const [notifications,setNotifications] = useState([]);
    const [notificationsPopUp,setNP] = useState(false);


    useEffect(()=>{
        fetchCUD();
    },[])
    const fetchCUD = async ()=>{
        const q=query(userRef,where("uid","==",`${currentUser.uid}`))
        const querySnapShot1 = await getDocs(q)
        const temp = []
        try{
            querySnapShot1.forEach((doc)=>{
                temp.push(doc.data())
            })
            setCUD(temp[0]);
            setNotifications(temp[0].notifications);
        }catch(err){
            console.log(err)
        }
    }
    const sendRequest = async ()=>{
        const nid = Date.now();
        const q=query(userRef,where("uid","==",`${SUserDetails.uid}`))
        const querySnapShot1 = await getDocs(q)
        const temp = []
        try{
            querySnapShot1.forEach((doc)=>{
                temp.push(doc.data())
            })
            let temp2 = temp[0].notifications;
            temp2 = [...temp2,{nid:nid,uid:`${currentUser.uid}`,name:`${currentUser.displayName}`,photoURL:`${currentUser.photoURL}`,status:0}]
            await updateDoc(doc(db,"users",`${SUserDetails.uid}`),{
                notifications:temp2,
            })
        }catch(err){
            console.log(err)
        }

        let temp2 = currentUserDetails.notifications;
        temp2 = [...temp2,{nid:nid,uid:`${currentUser.uid}`,name:`${SUserDetails.displayName}`,photoURL:`${SUserDetails.photoURL}`,status:0}];
        await updateDoc(doc(db,"users",`${currentUser.uid}`),{
            notifications:temp2,
        })

    }
    const declineRequest = async(details)=>{
        const time = Date.now()
        const querySnapShot1 = await getDocs(q)
        let updatedNotificationsU = currentUserDetails.notifications;
        for(let i=0;i<updatedNotificationsU.length;i++){
            if(updatedNotificationsU[i].nid == details.nid){
                updatedNotificationsU[i].status = 2;
                updatedNotificationsU[i].nid = time;
            }
        }
        await updateDoc(doc(db,"users",`${currentUser.uid}`),{
            notifications:updatedNotificationsU
        })
        
        const temp1 = []
        const q=query(userRef,where("uid","==",`${details.uid}`))
        try{
            querySnapShot1.forEach((doc)=>{
                temp1.push(doc.data())
            })
            let updatedNotificationsF = currentUserDetails.notifications;
            for(let i=0;i<updatedNotificationsF.length;i++){
                if(updatedNotificationsF[i].nid == details.nid){
                    updatedNotificationsF[i].status = 2;
                    updatedNotificationsF[i].nid = time;
                }
            }
            await updateDoc(doc(db,"users",`${details.uid}`),{
                notifications:updatedNotificationsF
            })
        }catch(err){
            console.log(err)
        }
    }
    const addFriend = async(details)=>{
        const q=query(userRef,where("uid","==",`${details.uid}`))
        const querySnapShot1 = await getDocs(q)
        let temp2 = currentUserDetails.friends
        temp2 = [...temp2,{uid:`${details.uid}`,name:`${details.name}`,photoURL:`${details.photoURL}`}]
        let updatedNotificationsU = currentUserDetails.notifications;
        const time = Date.now();
        for(let i=0;i<updatedNotificationsU.length;i++){
            if(updatedNotificationsU[i].nid == details.nid){
                updatedNotificationsU[i].status = 1;
                updatedNotificationsU[i].nid = time;
            }
        }
        await updateDoc(doc(db,"users",`${currentUser.uid}`),{
            friends:temp2,
            notifications:updatedNotificationsU
        }).then(async()=>{
            await setDoc(doc(db, "userChat", `${currentUser.uid}`+`${details.uid}`), {
                text:[],
                photos:[],
                chatId:`${currentUser.uid}`+`${details.uid}`
            });
        })
        
        const temp1 = []
        try{
            querySnapShot1.forEach((doc)=>{
                temp1.push(doc.data())
            })
            let temp2 = temp1[0].friends
            temp2 = [...temp2,{uid:`${currentUser.uid}`,name:`${currentUser.displayName}`,photoURL:`${currentUser.photoURL}`}]
            let updatedNotificationsF = currentUserDetails.notifications;
            for(let i=0;i<updatedNotificationsF.length;i++){
                if(updatedNotificationsF[i].nid == details.nid){
                    updatedNotificationsF[i].status = 1;
                    updatedNotificationsF[i].nid = time;
                }
            }
            await updateDoc(doc(db,"users",`${details.uid}`),{
                friends:temp2,
                notifications:updatedNotificationsF
            })
            setcf({uid:`${details.uid}`,name:`${details.name}`,photoURL:`${details.photoURL}`})
        }catch(err){
            console.log(err)
        }
    }
    const searchFor=async()=>{
        const q = query(userRef,where("displayName","==",`${Search}`))
        const temp = []
        const querySnapShot1 = await getDocs(q)
        try{
            querySnapShot1.forEach((doc)=>{
                temp.push(doc.data())
            })
            if(temp.length >= 1){
                setUDetails(temp[0])
            }
            else{
                setUDetails(null)
            }
            setSVis(true)
        }catch(err){
            console.log(err)
        }

    }
    const ViewDetails = () =>{
        setAS(true)
        console.log('hi')
    }
    return(
        <>
            {
                authState &&
                <div className="popUp2" onClick={()=>{setAS(false)}}>
                    <div className="content"> 
                        <button onClick={()=>signOut(auth)}>Log-out</button>
                    </div>
                </div> 
            }
            <div className="Navbar">
                <img src={currentUser.photoURL} className="dp" onClick={()=>ViewDetails()}></img>
                <p style={{alignSelf:'center'}}>{currentUser.displayName}</p>
                <input type="text" className="search" onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search for users"></input>
                <button className="Sbtn" onClick={()=>searchFor()}><img src={searchIcon}></img></button>
                <button className='notifications' onClick={()=>{setNP(true)}}><img src={noti}></img></button>
            </div>
            {
                SVis &&
                <div className="popupdiv" onClick={()=>setSVis(false)}>
                    <div className="searchPopUp">
                    {
                        SUserDetails !=null && 
                        <>
                            <img src={SUserDetails.photoURL} className="dp1"></img>
                            <div className="details">
                                <div className="SName">{SUserDetails.displayName}</div>
                                <div className="SEmail">{SUserDetails.email}</div>
                                <button className="Add" onClick={()=>sendRequest()}><img src={add}></img></button>
                            </div>
                        </>
                    }
                    {
                        SUserDetails == null && 
                        <>
                            <img src={noRes} style={{borderRadius:'0%'}}></img>
                            <p>No users found with this username!!</p>
                        </>
                    }
                        
                    </div>
                </div>
            }
            {
                notificationsPopUp && 
                <div className="popupdiv" onClick={()=>setNP(false)}>
                    <div className="notificationsDiv">
                        {notifications.length > 0 && 
                            notifications.map((notification)=>{
                                if(notification.status == 0 && notification.uid == currentUser.uid){
                                    return(
                                        <div className="friendRequest">
                                            <img src ={notification.photoURL}></img>
                                            <p>{notification.name}</p>
                                            <p>pending</p>
                                        </div>
                                    )
                                }
                                else if(notification.status == 0){
                                    return(
                                        <div className="friendRequest">
                                            <img src ={notification.photoURL}></img>
                                            <p>{notification.name}</p>
                                            <div className="ADbts">
                                                <button onClick={()=>addFriend(notification)}>A</button>
                                                <button onClick={()=>declineRequest(notification)}>D</button>
                                            </div>
                                        </div>
                                    )
                                }
                                else if(notification.status == 1){
                                    return(
                                        <div className="friendRequest">
                                            <img src ={notification.photoURL}></img>
                                            <p>{notification.name}</p>
                                            <p>Accepted</p>
                                        </div>
                                    )
                                }
                                else if(notification.status == 2){
                                    return(
                                        <div className="friendRequest">
                                            <img src ={notification.photoURL}></img>
                                            <p>{notification.name}</p>
                                            <p>Rejected</p>
                                        </div>
                                    )
                                }
                            })
                        }
                        {notifications.length == 0 &&
                            <p>No notifications!!</p>
                        }
                    </div>
                </div>
            }

        </>
    )
}
export default Navbar