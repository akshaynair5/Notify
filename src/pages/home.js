import Chats from "../components/chats"
import Users from "../components/users"
import Search from "../components/search"
function Home(){
    return(
        <div className='home'>
            <Search/>
            {/* <Chats/> */}
            <Users/>
        </div>
    )
}

export default Home