import callApiHttp from 'functions/callApiHttp'
import React, { useContext, createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const userContext = createContext()

function ProvideUser({ children }) {
    const user = useProvideUser()
    return <userContext.Provider value={user}>{children}</userContext.Provider>
}
ProvideUser.propTypes = {
    children: PropTypes.node.isRequired,
}

function useUser() {
    return useContext(userContext)
}

function useProvideUser() {
    const [userInfo, setUserInfo] = useState(localStorage.getItem('user_info'))
    useEffect(() => {
        fetchUserInfo()
    }, [])

    const fetchUserInfo = async () => {
        try {
            const res = await callApiHttp({
                url: `/user`,
                method: 'GET',
            })
            const { data } = res
            if (data.code === 200) {
                setUserInfo(data.data)
                localStorage.setItem('user_info', JSON.stringify(data.data))
            } else {
                // console.log('error: ', data)
            }
        } catch (error) {
            // console.log(`error: ${  error}`)
        }
    }

    return {
        userInfo,
        setUserInfo,
        fetchUserInfo,
    }
}

export { ProvideUser, useUser, useProvideUser }
