import React, { useEffect, useState } from 'react'
import callApiHttp from 'functions/callApiHttp'

import { ISREAD, NEW_CONVERSATION, RECEIVED } from 'commons/socketEvents'
import { useAuth } from 'hooks/useAuth'
import ConversationElement from '../ConversationElement'

const ListConversations = () => {
    const [listConversations, setListConversations] = useState()
    // const { id } = useParams()
    const { socket, userOnlines } = useAuth()
    const user = localStorage.getItem('user_id')
    useEffect(() => {
        const fetchListConversations = async () => {
            const { data } = await callApiHttp({
                method: 'GET',
                url: '/conversation/',
            })
            if (data.code === 200) {
                setListConversations(
                    data.data.sort(
                        (a, b) =>
                            b?.last_message.created - a?.last_message.created
                    )
                )
            } else {
                // alert('error')
            }
        }
        fetchListConversations()
    }, [])

    useEffect(() => {
        socket &&
            socket.on(NEW_CONVERSATION, (data) => {
                const { _id } = data
                const userId = localStorage.getItem('user_id')
                const senderId = data.last_message.sender
                senderId !== userId &&
                    _id !== sessionStorage.getItem('conversationId') &&
                    socket.emit(RECEIVED, {
                        conversationId: _id,
                        receiverId: senderId,
                        userId,
                    })
                setListConversations((x) => [
                    data,
                    ...x.filter((y) => {
                        const { _id: yId } = y
                        return yId !== _id
                    }),
                ])
            })
        return () => {
            socket && socket.off(NEW_CONVERSATION)
        }
    }, [socket])

    useEffect(() => {
        let isSubscribed = true
        socket &&
            socket.on(ISREAD, (data) => {
                // setListConversations([])
                // console.log(`isread`, data)
                isSubscribed &&
                    setListConversations((x) => {
                        const i = x.find((e) => {
                            const { _id: eId } = e
                            return eId === data?.conversationId
                        })
                        // if (i !== -1) x[i].last_message.is_read = 2
                        // if (data.userId !== localStorage.getItem('user_id')) {
                        // }
                        // i.last_message.sender = data.userId
                        // console.log(`i.last_message`, i.last_message)
                        data.userId !== i?.last_message.sender &&
                            (i.last_message.is_read = 2)
                        return [...x]
                    })
            })
        return () => {
            isSubscribed = false
            socket && socket.off(ISREAD)
        }
    }, [socket])

    useEffect(() => {
        let isSubscribed = true
        socket &&
            socket.on(RECEIVED, (data) => {
                // console.log(`receive`, data)
                isSubscribed &&
                    setListConversations((x) => {
                        const i = x.find((e) => {
                            const { _id: eId } = e
                            return eId === data?.conversationId
                        })
                        i.last_message.is_read = 1
                        return [...x]
                    })
            })
        return () => {
            isSubscribed = false
            socket && socket.off(RECEIVED)
        }
    }, [socket])

    return (
        <div className="list-conversation overflow-auto p-1">
            {listConversations?.length > 0 ? (
                listConversations?.map((conversationE, index) => {
                    const conversation = conversationE
                    conversation.members = conversation.members.filter((x) => {
                        const { _id: xId } = x
                        return xId !== user
                    })
                    console.log("???????????: ", conversation)
                    if(conversation.is_group){
                        const isOnline = false
                        const conversationName = conversation.name
                        const lastMessage = conversation?.last_message ? conversation?.last_message : {}
                        const { _id: conversationId } = conversation
                        return (
                            <ConversationElement
                                isOnline={isOnline}
                                conversation={conversation}
                                conversationId={conversationId}
                                conversationName={conversationName}
                                key={conversationId}
                                firstMessage={lastMessage}
                            />
                        )
                    }
                    const tempMember = conversation.members[0]
                    const { _id: memberId } = tempMember
                    const conversationName =
                        tempMember.username || tempMember.email
                    const { _id: conversationId } = tempMember
                    return (
                        <ConversationElement
                            isOnline={userOnlines?.includes(memberId)}
                            members={tempMember}
                            conversation={conversation}
                            conversationId={conversationId}
                            conversationName={conversationName}
                            key={conversationId}
                            firstMessage={conversation?.last_message}
                        />
                    )
                })
            ) : (
                <i>You have no conversation</i>
            )}
        </div>
    )
}

export default ListConversations
