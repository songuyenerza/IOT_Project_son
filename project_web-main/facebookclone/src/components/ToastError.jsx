import React from 'react'
import PropTypes from 'prop-types'
import OfflineIconFacebook from './UI/OfflineIconFacebook'

const ToastError = ({ code, message }) => (
    <div className="absolute bottom-0 left-0 bg-gray-700 w-80 h-20 rounded-xl m-5 p-5 inline">
        <OfflineIconFacebook />
        <span>{message}</span>
    </div>
)
ToastError.defaultProps = {
    code: 404,
}

ToastError.propTypes = {
    code: PropTypes.number,
    message: PropTypes.string.isRequired,
}

export default ToastError
