import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ title = 'Title' }) => (
    <div className="font-semibold text-xl px-2">{title}</div>
)
Title.propTypes = {
    title: PropTypes.string.isRequired,
}
export default Title
