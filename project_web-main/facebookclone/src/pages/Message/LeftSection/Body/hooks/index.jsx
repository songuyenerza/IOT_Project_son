import callApiHttp from 'functions/callApiHttp'
import React, { useContext, createContext, useState } from 'react'
import PropTypes from 'prop-types'

const bodyContext = createContext()

function ProvideBody({ children }) {
    const body = useProvideBody()
    return <bodyContext.Provider value={body}>{children}</bodyContext.Provider>
}
ProvideBody.propTypes = {
    children: PropTypes.node.isRequired,
}

function useBody() {
    return useContext(bodyContext)
}

function useProvideBody() {
    const [listUsers, setListUsers] = useState([])
    const fetchUsers = async (keyword) => {
        try {
            const { data } = await callApiHttp({
                method: 'GET',
                url: `/search/search_user?keyword=${keyword}`,
            })
            if (data.code === 200) {
                setListUsers(data.data)
            } else {
                // console.log(data.message)
            }
        } catch (error) {
            // console.log(error)
            // alert(error.message)
        }
    }
    return {
        listUsers,
        setListUsers,
        fetchUsers,
    }
}

export { ProvideBody, useBody, useProvideBody }
