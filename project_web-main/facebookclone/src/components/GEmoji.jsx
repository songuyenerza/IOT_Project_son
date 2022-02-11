import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const GEmoji = ({ onPickEmoji, isOpen = false, setOpen }) => {
    const emojiRef = useRef()
    useEffect(() => {
        const handlePickEmoji = (event) => {
            if (emojiRef && !emojiRef.current.contains(event.target)) {
                setOpen && setOpen(false)
            } else {
                event.target.alt && onPickEmoji && onPickEmoji(event.target.alt)
            }
        }
        document.addEventListener('mousedown', handlePickEmoji)
        return () => {
            document.removeEventListener('mousedown', handlePickEmoji)
        }
    }, [onPickEmoji, setOpen])

    return (
        <div
            ref={emojiRef}
            className={classnames(
                'absolute bottom-full right-0 flex fb-bg-dark max-w-xs flex-wrap p-1 h-56 overflow-auto rounded-lg',
                { hidden: !isOpen }
            )}
        >
            <img
                alt="👩‍❤️‍👨"
                className="flex-shrink-0 p-1 box-content"
                draggable="false"
                height="28"
                src="https://static.xx.fbcdn.net/images/emoji.php/v9/tef/1.5/28/1f469_200d_2764_200d_1f468.png"
                width="28"
            />
        </div>
    )
}

GEmoji.propTypes = {
    onPickEmoji: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
}

export default GEmoji
