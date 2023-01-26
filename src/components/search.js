import settings from '../imgs/gear.png'

function Navbar(){
    return(
        <div className='navbar'>
            <img src={settings} style={{height:'45px',position:'absolute',left:'10%'}}></img>
            <div className="search">
                <input type='search' style={{height:'50px',position:'absolute',left:'20%',width:'55%',borderRadius:'20px'}}></input>
                <input type='button' value='Search' style={{position:'absolute',left:'75.5%',height:'50px',borderRadius:'20px'}}></input>
            </div>
            <img src={settings} style={{height:'45px',position:'absolute',left:'90%'}}></img>
        </div>
    )
}

export default Navbar