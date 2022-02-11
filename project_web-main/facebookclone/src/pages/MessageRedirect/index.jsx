import callApiHttp from 'functions/callApiHttp'
import { useAuth } from 'hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

const MessageRedirect = () => {
    const { user } = useAuth()
    const [lastConversation, setLastConversation] = useState()
    useEffect(() => {
        const fetchLastConversation = async () => {
            const { data } = await callApiHttp({
                method: 'GET',
                url: '/conversation/get_last_conversation',
            })
            if (data.code === 200) {
                if (data.data?.length > 0) {
                    const { members } = data.data[0]
                    setLastConversation(
                        `/message/t/${members.filter((x) => x !== user)[0]}`
                    )
                } else {
                    setLastConversation('/message/t/')
                }
            } else {
                setLastConversation('/message/t/')
                // console.log(data.message)
            }
        }
        fetchLastConversation()
    }, [user])
    return lastConversation ? (
        <Redirect to={lastConversation} />
    ) : (
        <div className="loading" />
    )
}

export default MessageRedirect
