import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase_config";
import { getDocs, doc } from "firebase/firestore";
export const Authcontext = createContext()


export const AuthContextProvider =({children})=>{
    const [currentUser,setCurrentUser] = useState({})
    const [currentfriend,setcf] = useState({})
    // const eventRef = collection(db,"users")
    // const fetchFriend=async()=>{
    //     const q=query(eventRef,where("uid","==",`${currentUser.uid}`))
    //     const querySnapShot1 = await getDocs(q)
    //     const temp = []
    //     try{
    //         querySnapShot1.forEach((doc)=>{
    //             temp.push(doc.data())
    //         })
    //         setcf(temp[0].currentfriend)
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
    const eventRef = collection(db,"users")
    const fetchFriend=async(user)=>{
        const q=query(eventRef,where("uid","==",`${user.uid}`))
        const querySnapShot1 = await getDocs(q)
        const temp = []
        try{
            querySnapShot1.forEach((doc)=>{
                temp.push(doc.data())
            })
            setcf(temp[0].currentfriend)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
            fetchFriend(user);
        })

        return ()=>{
            unsub();
        }
    },[]);

    return(
        <Authcontext.Provider value={{currentUser,currentfriend,setcf}}>
            {children}
        </Authcontext.Provider>
    )
    
}