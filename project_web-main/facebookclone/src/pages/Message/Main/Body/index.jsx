import React from 'react'

import MessageBlock from 'components/MessageBlock'
import MessageTime from 'components/MessageTime'
import AvatarBlock16 from 'components/AvatarBlock16'
import { useAuth } from 'hooks/useAuth'
import { useMain } from '../contexts'

const Body = () => {
    const { user } = useAuth()
    const { groupConversation, conversation, userInfo, typing } = useMain()
    const lastIndexOf = (array, key) => {
        for (let i = array.length - 1; i >= 0; i -= 1) {
            if (array[i].sender !== key) return i
        }
        return -1
    }

    const c = conversation || groupConversation || {}

    const indexLastMessage = lastIndexOf(c?.messages || [], user)
    return (
        <div>
            {c?.messages?.length > 0 ? (
                c.messages.map((message, index, messages) => {
                    const { _id } = message
                    const prev =
                        messages[index - 1]?.sender === message?.sender &&
                        new Date(message?.created).getTime() -
                            new Date(messages[index - 1]?.created).getTime() <
                            200 * 60
                            ? 1
                            : 0
                    const next =
                        messages[index + 1]?.sender === message?.sender &&
                        new Date(messages[index + 1]?.created).getTime() -
                            new Date(message?.created).getTime() <
                            200 * 60
                            ? 1
                            : 0
                    const isMe = user === message?.sender
                    return (
                        <div key={_id}>
                            {!prev && <MessageTime time={message?.created} />}
                            <MessageBlock
                                message={message}
                                isMe={isMe}
                                userInfo={userInfo}
                                prev={prev}
                                next={next}
                                isShowStatus={index >= indexLastMessage}
                            />
                        </div>
                    )
                })
            ) : (
                <i>You have no message</i>
            )}
            {typing && (
                <div className="flex p-0.5">
                    <div className="flex items-end mx-2">
                        <AvatarBlock16
                            src={userInfo?.avatar}
                            className="w-7 h-7"
                        />
                    </div>
                    <div id="wave" className="bg-gray-600">
                        <span className="dot one" />
                        <span className="dot two" />
                        <span className="dot three" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Body
