import user from '../imgs/user.png'
function Users(){
    return(
        <div className='users' style={{position:'fixed',top:'10%'}}>
            <div className='usertab' style={{}}>
                <img src={user} style={{height:'68%',margin:'3%',marginTop:'4%'}}></img>
                <p style={{position:'relative',top:'10%',left:'8%',fontSize:'160%',fontSize:'160%'}}>User-1</p>
            </div>
        </div>
    )
}

export default Users

// style={{position:'static',height:'90%'}}