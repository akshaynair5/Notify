import logo from '../imgs/logo.png'
import { Link } from 'react-router-dom'
import { auth } from '../firebase_config'
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase_config'
import { storage } from '../firebase_config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function Register(){

    const [err,setErr] = useState(false)
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const email = e.target[1].value
        const password = e.target[2].value
        const displayName = e.target[0].value
        const dp = e.target[4].value
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)
                const storageRef = ref(storage,displayName)
                const uploadTask = uploadBytesResumable(storageRef, dp);
                uploadTask.on(
                    (error) => {
                        setErr(true);
                    }, 
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                            await updateProfile(res.user,{
                                displayName,
                                photoURL:downloadURL
                            })
                            await setDoc(doc(db, "users", res.user.uid), {
                                uid:res.user.uid,
                                displayName,
                                email,
                                photoURL:downloadURL
                            });
                        });
                    }
                );
        }catch(error){
            setErr(true)
        }

    }
    return(
        <form className="Form" onSubmit={(e)=>{handleSubmit(e)}}>
            <img src={logo} style={{height:'300px',width:'400px',marginLeft:'20%'}}></img>
            <input type="text" placeholder="Name"></input>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <input type='file' ></input>
            <input type='submit' value='Register' className="button-35" style={{backgroundColor:'#8B9490'}}></input>
            <div className='Navs' style={{display:'flex',flexDirection:'row'}}>
                <p>Already have an Account? </p>
                {err && <span>Something went wrong Try again!!</span>}
                <Link to='/Login' style={{color:'black',fontSize:'20px',textDecoration:'none',marginTop: '2.8%',marginLeft:'2%'}}>Click Here to Login</Link>
            </div>
        </form>
    )
}

export default Register