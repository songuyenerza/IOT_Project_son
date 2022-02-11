import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AvatarBlock16 from 'components/AvatarBlock16'

const SearchUserElement = ({
    _id,
    avatar,
    email,
    is_friend: isFriend,
    username,
    status,
}) => (
    <Link to={`/message/t/${_id || ''}`}>
        <div className="fb-hover-bg-dark flex items-center no-underline p-2 items-center rounded-xl">
            <div className="w-9 h-9 relative">
                <AvatarBlock16 src={avatar} className="w-9 h-9" />
                {status || (
                    <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-2 h-2 border-2 border-current" />
                )}
            </div>
            <div className="flex-grow px-3">
                <div className="">{username || email || 'null'}</div>
                {/* <div className="text-xs">
                    is_friend: {isFriend ? 'true' : 'false'}
                </div> */}
            </div>
        </div>
    </Link>
)
SearchUserElement.propTypes = {
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    is_friend: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
}

export default SearchUserElement
