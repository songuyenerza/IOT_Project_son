import React from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'
import { GiJoint } from 'react-icons/gi'
import { AiFillEdit } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import AvatarBlock16 from 'components/AvatarBlock16'
import { useProvideUser } from 'hooks/useUser'
import IconButton from './components/IconButton'

const Header = () => {
    const { userInfo } = useProvideUser()

    const location = useLocation()

    return (
        <div className="p-2 flex flex-row items-center space-x-2 hidden lg:flex">
            <Link to="/">
                <AvatarBlock16 src={userInfo?.avatar} className="w-10 h-10" />
            </Link>
            <span className="flex-grow font-bold text-2xl">Chats</span>
            <IconButton component={<FiMoreHorizontal size="20" />} />

            <Link to={{
                pathname: "/join-group",
                state: { from: location }
            }}>
                <IconButton component={<GiJoint size="20" />} />
            </Link>
            <Link to={{
                pathname: "/group",
                state: { from: location }
            }}>
                <IconButton component={<AiFillEdit size="20" />} />
            </Link>
        </div>
    )
}

export default Header
