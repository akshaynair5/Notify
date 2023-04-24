import Chats from "../components/chats/chats"
import Users from "../components/users/users"
import Navbar from "../components/Navbar/Navbar"
import { useEffect } from "react"
function Home(){
    // const fetchFriend ()=>{

    // }
    // useEffect(()=>{
    //     fetchFriend()
    // })
    return(
        <div className='home'>
            <Navbar/>
            <Chats/>
            <Users/>
        </div>
    )
}

export default Home