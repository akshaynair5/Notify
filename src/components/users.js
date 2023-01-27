import user from '../imgs/user.png'
function Users(){
    return(
        <div className='users'>
            <div className='usertab'>
                <img src={user} style={{height:'68%',margin:'3%',marginTop:'4%'}}></img>
                <p style={{position:'relative',top:'10%',left:'8%',fontSize:'160%'}}>User-1</p>
            </div>
            <div className='usertab'>
                <img src={user} style={{height:'68%',margin:'3%',marginTop:'4%'}}></img>
                <p style={{position:'relative',top:'10%',left:'8%',fontSize:'160%'}}>User-2</p>
            </div>
        </div>
    )
}

export default Users