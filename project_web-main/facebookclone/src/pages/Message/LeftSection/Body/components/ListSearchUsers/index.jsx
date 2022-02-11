import React from 'react'

import { useBody } from '../../hooks'
import SearchUserElement from './SearchUserElement'

const ListSearchUsers = () => {
    const { listUsers } = useBody()
    return (
        <div className="w-96 h-full absolute top-0 left-0 fb-bg-dark p-1 border-r border-gray-600">
            {listUsers?.length > 0 ? (
                listUsers.map((user) => {
                    const {
                        _id,
                        avatar,
                        email,
                        is_friend: isFriend,
                        username,
                        status,
                    } = user
                    return (
                        <SearchUserElement
                            key={_id}
                            _id={_id}
                            avatar={avatar}
                            email={email}
                            is_friend={isFriend}
                            username={username}
                            status={status}
                        />
                    )
                })
            ) : (
                <div className="loader" />
            )}
        </div>
    )
}

export default ListSearchUsers
