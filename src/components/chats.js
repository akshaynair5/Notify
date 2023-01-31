import { useContext } from "react"
import { Authcontext } from "../context/authcontext"

function Chats(){
    const {currentUser} = useContext(Authcontext)
    return(
        <div>
            <div className='chat' style={{position:'fixed',left:'32%',top:'15%',width:'68%',overflowY:'scroll',height:'78%'}}>
                <div className='you' style={{backgroundColor:'#679076',fontSize:'150%',borderRadius:'25px',minWidth:'10%',height:'fit-content',whiteSpace: 'pre-wrap',maxWidth:'85%',wordWrap:'break-word',padding:'2%',margin:'3%',display:'flex'}}>
                    <p>Hi</p>
                    <img src={currentUser.photoURL} style={{width:'10%',position:'relative',left:'101%',top:'7%'}}></img>
                </div>
                <div className='you' style={{backgroundColor:'#679076',fontSize:'150%',borderRadius:'25px',minWidth:'10%',height:'fit-content',whiteSpace: 'pre-wrap',maxWidth:'85%',wordWrap:'break-word',padding:'2%',margin:'3%',display:'flex'}}>
                    <p>Hi</p>
                    <img src={currentUser.photoURL} style={{width:'10%',position:'relative',left:'101%',top:'7%'}}></img>
                </div>
                <div className='friend' style={{backgroundColor:'#107869',fontSize:'150%',borderRadius:'25px',minWidth:'10%',height:'fit-content',whiteSpace: 'pre-wrap',maxWidth:'85%',wordWrap:'break-word',padding:'2%',margin:'3%',display:'flex',left:'5%',position:'relative'}}>
                    <img src={currentUser.photoURL} style={{width:'10%',position:'relative',top:'7%',left:'-12%'}}></img>
                    <p>Hi</p>
                </div>
                <div className='friend' style={{backgroundColor:'#107869',fontSize:'150%',borderRadius:'25px',minWidth:'10%',height:'fit-content',whiteSpace: 'pre-wrap',maxWidth:'85%',wordWrap:'break-word',padding:'2%',margin:'3%',display:'flex',left:'5%',position:'relative'}}>
                    <img src={currentUser.photoURL} style={{width:'10%',position:'relative',top:'7%',left:'-12%'}}></img>
                    <p>Hi</p>
                </div>
            </div>

            <div style={{backgroundColor:"white",top:'30%',width:'70%'}}>
                <input type='text' placeholder="Notify ...." style={{position:'absolute',bottom:'3%',padding:'1.5%',left:'35%',width:'50%',borderRadius:'25px'}}></input>
            </div>
        </div>
    )
}

export default Chats