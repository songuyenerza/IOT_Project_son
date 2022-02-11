import React from 'react'
import logo from 'assets/images/avatar.png'
import PropTypes from 'prop-types'

const AvatarBlock16 = ({ src, className }) => (
    <img
        src={src}
        alt="avatar"
        className={`rounded-full object-cover ${className}`}
    />
)

AvatarBlock16.defaultProps = {
    src: logo,
    className: 'w-16 h-16',
}

AvatarBlock16.propTypes = {
    src: PropTypes.string,
    className: PropTypes.string,
}

export default AvatarBlock16
