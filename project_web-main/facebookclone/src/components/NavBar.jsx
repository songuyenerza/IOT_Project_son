import { useProvideUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AvatarBlock16 from './AvatarBlock16'
// import routes from 'routes'
import LogoutButton from './LogoutButton'
import DropIcon from './UI/DropIcon'
import FriendIconFacebook from './UI/FriendIconFacebook'
import HomeIconFacebook from './UI/HomeIconFacebook'
import LogoFacebook from './UI/LogoFacebook'
import MessageIconFacebook from './UI/MessageIconFacebook'
import WatchIconFacebook from './UI/WatchIconFacebook'
import logo from "../assets/images/hust.png"

function NavBar() {
    const [showDropdown, setShowDropdown] = useState(false)
    const [userInfo, setUserInfo] = useState();
    useProvideUser();
    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem('user_info')));
    })
    return (
        <div className="fixed z-50 w-full fb-bg-dark flex flex-row items-center justify-between border-b border-gray-500">
            <div className="ml-4 flex flex-row space-x-2 items-center">
                <img src={logo} style={{height: "36px"}} />
                <input
                    type="search"
                    className="rounded-full focus:outline-none p-2 fb-bg-dark-2 w-20 md:w-full"
                    placeholder="Search doing"
                />
            </div>
            <div className="flex-grow flex flex-row ml-0 md:ml-56">
                <NavLink
                    to="/"
                    exact
                    activeClassName="fb-bg-active"
                    className="fb-hover-bg-dark md:w-40 w-28 rounded-lg flex justify-center h-14 items-center text-white"
                >
                    <HomeIconFacebook />
                </NavLink>
                <NavLink
                    to="/watch"
                    activeClassName="fb-bg-active"
                    className="fb-hover-bg-dark md:w-40 w-28 rounded-lg flex justify-center h-14 items-center text-white"
                >
                    <WatchIconFacebook />
                </NavLink>

                <NavLink
                    to="/friend"
                    activeClassName="fb-bg-active"
                    className=" fb-hover-bg-dark md:w-40 w-28 rounded-lg flex justify-center h-14 items-center text-white"
                >
                    <FriendIconFacebook />
                </NavLink>
            </div>
            <div className="flex flex-row items-center space-x-2 flex-shrink-0">
                <div
                    activeClassName="text-blue-500 fb-bg-main-2"
                    className="p-1 rounded-full flex flex-row items-center fb-hover-bg-dark text-white"
                >
                    <AvatarBlock16
                        src={userInfo?.avatar}
                        className="w-7 h-7 mr-1"
                    />
                    <span className="mr-1 font-semibold">
                        {`${userInfo?.firstname} ${userInfo?.lastname}` || 'Name'}
                    </span>
                </div>

                <NavLink
                    to="/message"
                    activeClassName="fb-bg-active"
                    className="w-10 h-10 rounded-full flex justify-center items-center fb-bg-dark-2 fb-hover-bg-dark text-white"
                >
                    <MessageIconFacebook />
                </NavLink>
                <button
                    type="button"
                    className="relative w-10 h-10 rounded-full fb-bg-dark-2 text-center flex items-center justify-center focus:outline-none mr-4"
                    onClick={() => setShowDropdown((x) => !x)}
                >
                    <DropIcon />
                </button>
                {showDropdown && (
                    <div className="absolute top-full right-0 w-56 fb-bg-dark-2 p-4 rounded-lg">
                        <LogoutButton />
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavBar
