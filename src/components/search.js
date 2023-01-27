import settings from '../imgs/gear.png'
import user from '../imgs/user.png'

function Navbar(){
    return(
        <div className='navbar'>
            <img src={user} style={{height:'5%',position:'absolute',left:'3%',top:'3%'}}></img>
            <div className="search">
                <input type='search' style={{height:'6%',position:'absolute',left:'20%',width:'55%',borderRadius:'20px'}}></input>
                <input type='button' value='Search' style={{position:'absolute',left:'75.5%',height:'6%',borderRadius:'20px'}}></input>
            </div>
            <img src={settings} style={{height:'5%',position:'absolute',left:'97%',top:'3%'}}></img>
        </div>
    )
}

export default Navbar