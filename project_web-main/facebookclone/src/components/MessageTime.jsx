import { toTimeFacebook } from 'functions/formatTime'
import React from 'react'
import PropTypes from 'prop-types'

const MessageTime = ({ time }) => (
    <div
        className="text-center font-semibold"
        style={{ fontSize: '11px', color: '#8a8d91' }}
    >
        {toTimeFacebook(time)}
    </div>
)
MessageTime.propTypes = {
    time: PropTypes.string.isRequired,
}

export default MessageTime
