import React from 'react'
import { RiLogoutCircleRLine } from 'react-icons/ri'
// import { useHistory } from 'react-router-dom'
// import { useAuth } from '../hooks/useAuth'

const LogoutButton = () => (
    // const history = useHistory()
    // const auth = useAuth()
    <button
        type="button"
        className="hover:bg-gray-500 p-3 flex items-center w-full rounded-md"
        onClick={() => {
            localStorage.clear()
            window.location.href = '/login'
        }}
    >
        <RiLogoutCircleRLine />
        &nbsp;
        <div>Logout</div>
    </button>
)

export default LogoutButton
