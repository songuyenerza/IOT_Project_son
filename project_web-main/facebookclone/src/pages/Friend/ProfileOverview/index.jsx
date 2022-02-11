import React from 'react'
import { useParams } from 'react-router-dom'

const ProfileOverview = () => {
    const { user_id: userId } = useParams()
    return (
        <div className="flex flex-grow justify-center items-center bg-black">
            Profile of {userId}
        </div>
    )
}

export default ProfileOverview
