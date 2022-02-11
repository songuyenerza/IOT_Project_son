import React from 'react'
import { VIDEO_CALL_URL } from 'commons/constants'
import { Redirect } from 'react-router-dom'
import AvatarBlock16 from 'components/AvatarBlock16'
import CallIconFacebook from 'components/UI/CallIconFacebook'
import VideoIconFacebook from 'components/UI/VideoIconFacebook'
import DetailIconFacebook from 'components/UI/DetailIconFacebook'
import { useAuth } from 'hooks/useAuth'
import { useMain } from '../contexts'

const Header = () => {
    const { setShow, userInfo, show, conversation, groupConversation } = useMain()
    const { _id: userId } = userInfo || 0
    const { _id: conversationId } = conversation || {}
    const { userOnlines, socket } = useAuth()
    function renderRedirect() {
        if (userInfo) {
            return null
        }
        return <Redirect to="/message/t" />
    }

    const handleClickCall = () => {
        console.log(`userId`, userId)
        socket.emit("CALL_VIDEO", {userId, linkVideoCall: `${VIDEO_CALL_URL}/videocall/${conversationId}`,
        senderId: localStorage.getItem("user_id")
    })
    }

    return (
        <>
            {/* {renderRedirect()} */}
            <div className="relative ">
                <AvatarBlock16 src={userInfo?.avatar} className="w-10 h-10" />
                {userOnlines?.includes(userId) && (
                    <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-3 h-3 border-2 border-current" />
                )}
            </div>

            <div className="flex-grow">
                <div className="text-lg font-semibold">
                    {userInfo?.username || userInfo?.email || groupConversation?.name || 'null'}
                </div>
                {userOnlines?.includes(userId) && (
                    <div className="text-xs">Active now</div>
                )}
            </div>
        </>
    )
}

export default Header
