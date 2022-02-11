import React from 'react'

const ReceivedStatus = () => (
    <svg
        alt="Sent"
        height="14px"
        width="14px"
        fill="gray"
        data-testid="message_delivery_state_sent"
    >
        <circle className="" cx="7" cy="7" r="6.5" />
        <path
            className=""
            fill="none"
            stroke="black"
            strokeWidth="1"
            d="M3.1,7,5.7,9.6l5.2-5.2"
        />
    </svg>
)

export default ReceivedStatus
