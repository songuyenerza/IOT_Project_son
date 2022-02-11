import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import SentStatus from 'components/icons/SentStatus'
import ReceivedStatus from 'components/icons/ReceivedStatus'
import PropTypes from 'prop-types'
import AvatarBlock16 from './AvatarBlock16'
import LikeFacebook from './LikeFacebook'

const MessageBlock = ({
    isMe = true,
    message = {},
    prev,
    next,
    userInfo = {},
    isShowStatus,
}) => {
    const renderUser = () => {
        console.log("userInfo: ",userInfo)
        return  (
            <p>userInfo</p>
        ) 
    }

    const renderMessage = () => {
        const { kind } = message
        if (kind === 'text') {
            if (
                message?.content?.slice(0, 8) === 'https://' ||
                message?.content?.slice(0, 7) === 'http://'
            ) {
                return (
                    <Link
                        to={message.content}
                        className={classnames(
                            'px-3 py-2 rounded-3xl bg-gray-600 underline',
                            {
                                'my-message bg-blue-600': isMe,
                                'rounded-tl': !isMe && prev,
                                'rounded-bl': !isMe && next,
                                'rounded-tr': isMe && prev,
                                'rounded-br': isMe && next,
                            }
                        )}
                    >
                        {message?.content}
                    </Link>
                )
            }

            return (
                <div
                    className={classnames('px-3 py-2 rounded-3xl fb-bg-msg', {
                        'my-message bg-blue-600': isMe,
                        'rounded-tl': !isMe && prev,
                        'rounded-bl': !isMe && next,
                        'rounded-tr': isMe && prev,
                        'rounded-br': isMe && next,
                    })}
                >
                    {message?.content || 'null'}
                </div>
            )
        }
        if (kind === 'react') {
            return <LikeFacebook className="w-8 h-8" />
        }
        if (kind === 'images') {
            const images = JSON.parse(message.content)
            const numberOfImages = images.length
            if (numberOfImages === 1) {
                return (
                    <img
                        src={images[0]}
                        alt="images"
                        className="object-cover rounded-lg w-96 h-96 m-1"
                    />
                )
            }
            if (numberOfImages === 2) {
                return (
                    <div className="flex space-x-2">
                        {images.map((image) => (
                            <img
                                src={image}
                                alt="images"
                                className="object-cover rounded-lg w-48 h-48"
                                key={image}
                            />
                        ))}
                    </div>
                )
            }

            return (
                <div
                    className={classnames('flex flex-wrap max-w-sm -m-1', {
                        'justify-end': isMe,
                    })}
                >
                    {images.map((image, index) => (
                        <img
                            src={image}
                            alt="images"
                            className="object-cover rounded-lg w-32 h-32 p-1"
                            key={image}
                        />
                    ))}
                </div>
            )
        }
        return null
    }

    const renderLastMessage = () => {
        if (message.status === 'sent') {
            return <SentStatus />
        }
        if (message.status === 'received') {
            return <ReceivedStatus />
        }
        if (message.status === 'read') {
            return <AvatarBlock16 src={userInfo?.avatar} className="w-4 h-4" />
        }
        if (message.status === 'error') {
            return <SentStatus />
        }
        return null
    }

    return (
        <div className={classnames('flex p-0.5', { 'flex-row-reverse': isMe })}>
            {!isMe ? (
                <div className="flex items-end mx-2">
                    {next ? (
                        <span className="w-7 h-7" />
                    ) : (
                        <AvatarBlock16
                            src={userInfo?.avatar}
                            className="w-7 h-7"
                        />
                    )}
                </div>
            ) : (
                <div className="w-4 flex items-end mx-1">
                    {isShowStatus && renderLastMessage()}
                </div>
            )}
            {renderMessage()}
            {/* {renderUser()} */}
        </div>
    )
}

MessageBlock.propTypes = {
    isMe: PropTypes.bool.isRequired,
    message: PropTypes.objectOf(PropTypes.any).isRequired,
    prev: PropTypes.number.isRequired,
    next: PropTypes.number.isRequired,
    userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
    isShowStatus: PropTypes.bool.isRequired,
}

export default MessageBlock
