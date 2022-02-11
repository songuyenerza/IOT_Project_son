import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import {
    JOIN,
    OUT_ROOM,
    SEND_MESSAGE,
    TYPING,
    RECEIVE_MESSAGE,
    ISREAD,
} from 'commons/socketEvents'
import { useAuth } from 'hooks/useAuth'

import callApiHttp from 'functions/callApiHttp'

function useProvideMain() {
    const [show, setShow] = useState(false)
    const { id } = useParams()
    const { socket, user } = useAuth()
    const [isGroup, setIsGroup] = useState(false)
    const [conversation, setConversation] = useState()
    const [groupConversation, setGroupConversation] = useState({})
    const [userInfo, setUserInfo] = useState(
        JSON.parse(localStorage.getItem('user_info'))
    )
    const [typing, setTyping] = useState(false)
    const [changing, setChanging] = useState(false)
    const handleTypingHook = (flag) => {
        const { _id } = conversation || {}
        if (!_id) return
        socket &&
            socket.emit(TYPING, {
                sender: user,
                conversationId: _id,
                typing: flag,
                kind: 'typing',
            })
    }

    const handleSubmitSendMessage = (e, kind = 'text') => {
        const now = new Date().toISOString()
        const { _id } = conversation || groupConversation || {}
        const g = !!groupConversation
        console.log("conversation: ", conversation)
        console.log(">>>>>>>>>: ", id, _id)
        socket.emit(SEND_MESSAGE, {
            sender: user,
            receiver: id,
            message: {
                kind,
                content: e,
            },
            conversationId: _id || '',
            group: g,
        })

        const newCon = (x) =>
        x
            ? {
                ...x,
                messages: [
                    ...x?.messages,
                    {
                        _id: now,
                        kind,
                        content: e,
                        sender: user,
                        created: now,
                    },
                ],
            }
            : {
                members: [id, user],
                messages: [
                    {
                        _id: now,
                        kind,
                        content: e,
                        sender: user,
                        created: now,
                    },
                ],
            }
        g ? setGroupConversation(newCon) : setConversation(newCon)
    }

    useEffect(() => {
        let isSubscribed = true
        const fetchConversation = async () => {
            try {
                const { data } = await callApiHttp({
                    method: 'GET',
                    url: `/conversation/${id}`,
                })
                if (data.code === 200) {
                    if (data.data) {
                        const { member, conversations } = data.data
                        isSubscribed && setUserInfo(member)
                        isSubscribed && setConversation(conversations)
                        const { _id } = conversations
                        sessionStorage.setItem('conversationId', _id)
                    } else {
                        isSubscribed && setConversation({})
                    }
                } else {
                    // console.log('err', data)
                }
            } catch (error) {
                // console.log(error)
            }
        }
        id && isSubscribed && fetchConversation()
        return () => {
            isSubscribed = false
        }
    }, [id])

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const res = await callApiHttp({
                    method: 'GET',
                    url: `conversation/messages/${id}`,
                })
                if (res.status === 200) {
                    if (res.data) {
                        const { data : conversations} = res || {}
                        setGroupConversation(conversations)
                        const { _id } = conversations
                        sessionStorage.setItem('conversationId', _id)
                    } else {
                        setGroupConversation({})
                    }
                } else {
                    // console.log('err', data)
                }
            } catch (error) {
                // console.log(error)
            }
        }
        id && fetchConversation()
    }, [id])

    const { _id, members } = conversation || {}
    useEffect(() => {
        //     if (!conversation) return null
        //     const { _id } = conversation
        if (!_id || !members) return null
        socket.emit(JOIN, {
            conversationId: _id,
            userId: localStorage.getItem('user_id'),
            members,
        })
        socket.on(RECEIVE_MESSAGE, (data) => {
            // console.log(`data`, data)
            socket.emit(ISREAD, {
                conversationId: _id,
                members,
                userId: localStorage.getItem('user_id'),
                receiverId: data.sender,
            })
            setConversation((x) => ({ ...x, messages: [...x.messages, data] }))
        })
        socket.on(TYPING, (data) => {
            setTyping(data.typing)
        })
        return () => {
            if (socket) {
                socket.off(RECEIVE_MESSAGE)
                socket.off(TYPING)
            }
            if (socket) socket.emit(OUT_ROOM, _id)
        }
    }, [socket, _id, members])

    return {
        show,
        setShow,
        conversation,
        handleSubmitSendMessage,
        userInfo,
        typing,
        setTyping,
        handleTypingHook,
        changing,
        setChanging,
        // message,
        // setMessage,
        groupConversation,
        setIsGroup
    }
}

export default useProvideMain
