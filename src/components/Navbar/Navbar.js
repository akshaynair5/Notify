import { useContext, useState } from "react"
import { Authcontext } from "../../context/authcontext"
import { auth } from "../../firebase_config";
import { collection, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase_config";
import { getDocs, doc ,setDoc,addDoc} from "firebase/firestore";
import noRes from '../../imgs/no-results.png'
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

    const addFriend=async()=>{
        const q=query(userRef,where("uid","==",`${currentUser.uid}`))
        const querySnapShot1 = await getDocs(q)
        const temp = []
        const temp1 = []
        try{
            querySnapShot1.forEach((doc)=>{
                temp.push(doc.data())
            })
            let temp2 = temp[0].friends
            temp2 = [...temp2,{uid:`${SUserDetails.uid}`,name:`${SUserDetails.displayName}`,photoURL:`${SUserDetails.photoURL}`}]
            await updateDoc(doc(db,"users",`${currentUser.uid}`),{
                friends:temp2,
            }).then(async()=>{
                await setDoc(doc(db, "userChat", `${currentUser.uid}`+`${SUserDetails.uid}`), {
                    text:[],
                    photos:[],
                    chatId:`${currentUser.uid}`+`${SUserDetails.uid}`
                });
            })
        }catch(err){
            console.log(err)
        }
        try{
            querySnapShot1.forEach((doc)=>{
                temp1.push(doc.data())
            })
            let temp2 = temp1[0].friends
            temp2 = [...temp2,{uid:`${currentUser.uid}`,name:`${currentUser.displayName}`,photoURL:`${currentUser.photoURL}`}]
            await updateDoc(doc(db,"users",`${SUserDetails.uid}`),{
                friends:temp2,
            })
            setcf({uid:`${SUserDetails.uid}`,name:`${SUserDetails.displayName}`,photoURL:`${SUserDetails.photoURL}`})
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
                <p style={{color:'white',alignSelf:'center'}}>{currentUser.displayName}</p>
                <input type="text" className="search" onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search for users"></input>
                <input type="button" value="Search" className="Sbtn" onClick={()=>searchFor()}></input>
            </div>
            {
                SVis &&
                <div className="popupdiv" onClick={()=>setSVis(false)}>
                    <div className="searchPopUp">
                    {
                        SUserDetails !=null && 
                        <>
                            <img src={SUserDetails.photoURL} id="dp1"></img>
                            <div className="details">
                                <div className="SName">{SUserDetails.displayName}</div>
                                <div className="SEmail">{SUserDetails.email}</div>
                                <input type="button" className="Add" value="Add +" onClick={()=>addFriend()}></input>
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

        </>
    )
}
export default Navbar