import { useContext, useState } from "react"
import { Authcontext } from "../../context/authcontext"
import { auth } from "../../firebase_config";
import { collection, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase_config";
import { getDocs, doc } from "firebase/firestore";
import "./Navbar.css"
import { signOut } from "firebase/auth";

function Navbar(){
    const [Search,setSearch] = useState("")
    const [SUserDetails,setUDetails] = useState([])
    const [SVis,setSVis] = useState(false)
    const {currentUser} = useContext(Authcontext)
    const eventRef = collection(db,"users")
    const addFriend=async()=>{
        const q=query(eventRef,where("uid","==",`${currentUser.uid}`))
        const querySnapShot1 = await getDocs(q)
        const temp = []
        try{
            querySnapShot1.forEach((doc)=>{
                temp.push(doc.data())
            })
            let temp2 = temp[0].friends
            temp2 = [...temp2,{uid:`${SUserDetails.uid}`,name:`${SUserDetails.displayName}`,photoURL:`${SUserDetails.photoURL}`}]
            await updateDoc(doc(db,"users",`${currentUser.uid}`),{
                friends:temp2,
            }).then(()=>{
                console.log("hii")
            })
        }catch(err){
            console.log(err)
        }
    }
    const searchFor=async()=>{
        const q = query(eventRef,where("displayName","==",`${Search}`))
        const temp = []
        const querySnapShot1 = await getDocs(q)
        try{
            querySnapShot1.forEach((doc)=>{
                temp.push(doc.data())
            })
            setUDetails(temp[0])
            setSVis(true)
        }catch(err){
            console.log(err)
        }

    }
    return(
        <>
            <div className="Navbar">
                <img src={currentUser.photoURL} className="dp" onClick={()=>{signOut(auth)}}></img>
                <input type="text" className="search" onChange={(e)=>{setSearch(e.target.value)}}></input>
                <input type="button" value="Search" className="Sbtn" onClick={()=>searchFor()}></input>
            </div>
            {
                SVis &&
                <div className="searchPopUp" onClick={()=>setSVis(false)}>
                    <img src={SUserDetails.photoURL}></img>
                    <div className="details">
                        <div className="SName">{SUserDetails.displayName}</div>
                        <div className="SEmail">{SUserDetails.email}</div>
                        <input type="button" className="Add" value="Add +" onClick={()=>addFriend()}></input>
                    </div>
                    
                </div>
            }

        </>
    )
}
export default Navbar