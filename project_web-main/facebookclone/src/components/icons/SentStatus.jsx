import React from 'react'

const SentStatus = () => (
    <svg
        alt="Sent"
        height="14px"
        width="14px"
        fill="#00000000"
        data-testid="message_delivery_state_sent"
    >
        <circle
            className=""
            stroke="gray"
            strokeWidth="1"
            cx="7"
            cy="7"
            r="6.5"
        />
        <path
            className=""
            fill="none"
            stroke="gray"
            strokeWidth="1"
            d="M3.1,7,5.7,9.6l5.2-5.2"
        />
    </svg>
)

export default SentStatus
