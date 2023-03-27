import Chats from "../components/chats/chats"
import Users from "../components/users"
import Navbar from "../components/Navbar/Navbar"
function Home(){
    return(
        <div className='home'>
            <Navbar/>
            <Chats/>
            <Users/>
        </div>
    )
}

export default Home