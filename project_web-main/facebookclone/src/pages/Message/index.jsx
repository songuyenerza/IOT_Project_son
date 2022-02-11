import React, {useEffect, useState} from 'react'
// absolute
import 'App.css'
// relative
import { Route, Switch } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'
import Main from './Main'
import LeftSection from './LeftSection'

function MessageNotId() {
    return (
        <div className="flex justify-center items-center flex-grow">
            <div className="text-3xl">
                hãy kết bạn nào !
            </div>
        </div>
    )
}

function Message() {
    const [isOpen, setIsOpen] = useState(false);
    const {socket} = useAuth()
    const [modalContent, setModalContent] = useState()
    const {sender} = modalContent||{}
    const {_id: senderId, username, avatar, email } = sender||{}
    useEffect(() => {
      socket&&socket.on("CALL_VIDEO",(data)=>{
        setIsOpen(x=>!x)
        setModalContent({
          ...data
        })
      })
      return () => {
        socket&&socket.off("CALL_VIDEO")
      }
    }, [socket])

    return (
        <div className="w-full h-full flex">
            <LeftSection />
            <Switch>
                <Route path="/message/t/" exact component={MessageNotId} />
                <Route path="/message/t/:id" component={Main} />
            </Switch>
            <div>
      {/* <button type="button" onClick={() => setIsOpen((x) => !x)}>
        open
      </button> */}
      {/* <div
        className="modal"
        style={{
          display: isOpen && "block"
        }}
      >
        <div className="modal-content animate flex text-black items-start p-4">
         
            <img className="rounded-full object-cover w-12 h-12" src={avatar} alt=""/>
            <div>{username||email||"null"} đang gọi bạn</div>
            <a className="bg-blue-600 mx-4" href={modalContent?.linkVideoCall} onClick={()=>setIsOpen(x=>!x)} target="blank">Nghe</a>
          <button className="bg-blue-500 rounded-md" type="button" onClick={() => setIsOpen((x) => !x)}>
            close
          </button>
        </div>
      </div> */}
    </div>
        </div>
    )
}

export default Message
