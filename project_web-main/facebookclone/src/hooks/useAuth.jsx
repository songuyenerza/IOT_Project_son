import React, { useContext, createContext, useState, useEffect } from 'react'
import io from 'socket.io-client'
import PropTypes from 'prop-types'
import { JOIN, USER_ONLINE } from '../commons/socketEvents'
import { REACT_APP_API_URL } from '../commons/constants'

const authContext = createContext()

function useProvideAuth() {
    const [user, setUser] = useState(localStorage.getItem('user_id'))
    const [userOnlines, setUserOnlines] = useState()
    const [socket, setSocket] = useState()
    useEffect(() => {
        if (user && socket) {
            socket.emit(JOIN, { userId: user })
            setInterval(()=>socket.emit(USER_ONLINE, { userId: user }), 5000)
            
            socket.on(USER_ONLINE, (data) => {
                setUserOnlines(data)
            })
        }
        return () => {
            if (socket) {
                socket.off(USER_ONLINE)
                socket.disconnect()
            }
        }
    }, [user, socket])

    useEffect(() => {
        setSocket(io(REACT_APP_API_URL))
    }, [])

    return {
        user,
        setUser,
        socket,
        userOnlines,
    }
}

function ProvideAuth({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

ProvideAuth.propTypes = {
    children: PropTypes.node.isRequired,
}

function useAuth() {
    return useContext(authContext)
}

export { ProvideAuth, useAuth, useProvideAuth }
