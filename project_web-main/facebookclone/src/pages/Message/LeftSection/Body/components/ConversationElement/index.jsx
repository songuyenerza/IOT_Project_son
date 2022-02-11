import React from 'react'
import { NavLink } from 'react-router-dom'
import { getTimeToNow } from 'functions/formatTime'
import AvatarBlock16 from 'components/AvatarBlock16'
import LikeFacebook from 'components/LikeFacebook'
import SentStatus from 'components/icons/SentStatus'
import ReceivedStatus from 'components/icons/ReceivedStatus'
import PropTypes from 'prop-types'

const ConversationElement = ({
    isOnline,
    members = {},
    conversation = {},
    conversationName = '',
    firstMessage = {},
    conversationId = '',
}) => {
    let isRead
    let isMe = ''
    if (firstMessage?.sender === localStorage.getItem('user_id')) {
        isRead = true
        isMe = 'You:'
    } else if (firstMessage?.is_read !== 0) {
        isRead = true
    } else {
        isRead = false
    }
    const renderFirstMessage = () => {
        if (firstMessage === {}) {
            return <i>You have no message</i>
        }
        if (firstMessage.kind === 'react') {
            return <LikeFacebook className="w-4 h-4" />
        }
        if (firstMessage.kind === 'text') {
            return <>{firstMessage.content || <i>You have no message</i>}</>
        }
        if (firstMessage.kind === 'images') {
            const json = JSON.parse(firstMessage.content)

            return (
                <i>
                    sent&nbsp;
                    {json?.length > 1 ? `${json?.length} photos.` : 'a photo.'}
                </i>
            )
        }

        return <i>Doing</i>
    }

    const renderStatusFirstMessage = () => {
        if (
            firstMessage.sender !== localStorage.getItem('user_id') &&
            firstMessage.is_read !== 2
        ) {
            return (
                <span className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0" />
            )
        }
        if (
            firstMessage.sender === localStorage.getItem('user_id') &&
            firstMessage.is_read === 0
        ) {
            return <SentStatus />
        }
        if (
            firstMessage.sender === localStorage.getItem('user_id') &&
            firstMessage.is_read === 1
        ) {
            return <ReceivedStatus />
        }
        if (
            firstMessage.sender === localStorage.getItem('user_id') &&
            firstMessage.is_read === 2
        ) {
            return <AvatarBlock16 src={members?.avatar} className="w-4 h-4" />
        }
        return null
    }

    return (
        <NavLink
            className="fb-hover-bg-dark"
            activeClassName="fb-bg-active-conversation"
            to={`/message/t/${conversationId}`}
        >
            <div
                className="flex h-16  items-center no-underline px-2 py-1  box-content rounded-xl"
                style={{
                    backgroundColor: 'inherit',
                    fontWeight: isRead ? '' : 'bolder',
                }}
            >
                <div className="flex items-center relative">
                    <AvatarBlock16
                        className="w-14 h-14 object-cover"
                        src={members?.avatar}
                    />
                    {isOnline && (
                        <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-4 h-4 border-4 border-current" />
                    )}
                </div>
                <div className="flex-grow flex-col px-2 overflow-hidden hidden lg:flex">
                    <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {conversationName || 'null'}
                    </span>
                    <div className="flex text-xs fb-cl-msg">
                        {isMe && (
                            <span className="flex-shrink-0">
                                {isMe}
                                &nbsp;
                            </span>
                        )}
                        <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                            {renderFirstMessage()}
                        </div>
                        <span>&nbsp;·&nbsp;</span>
                        <span className="flex-shrink-0">
                            {getTimeToNow(firstMessage?.created)}{' '}
                        </span>
                    </div>
                </div>
                {renderStatusFirstMessage()}
            </div>
        </NavLink>
    )
}
ConversationElement.defaultProps = {
    isOnline: false,
}

ConversationElement.propTypes = {
    isOnline: PropTypes.bool,
    members: PropTypes.objectOf(PropTypes.any).isRequired,
    conversation: PropTypes.objectOf(PropTypes.any).isRequired,
    conversationName: PropTypes.string.isRequired,
    firstMessage: PropTypes.objectOf(PropTypes.any).isRequired,
    conversationId: PropTypes.string.isRequired,
}

export default ConversationElement
