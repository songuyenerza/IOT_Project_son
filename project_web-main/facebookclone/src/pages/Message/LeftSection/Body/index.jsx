// import callApiHttp from 'functions/callApiHttp';
import classNames from 'classnames'
import LeftArrow from 'components/UI/LeftArrow'
import React, { useEffect, useRef, useState } from 'react'
import { ProvideBody, useBody } from './hooks'

import ListConversations from './components/ListConversations'
import ListSearchUsers from './components/ListSearchUsers'

const BodyImpl = () => {
    const ref = useRef(null)
    const refInput = useRef(null)
    const refTimeout = useRef(null)

    const [searching, setSearching] = useState(false)
    const [keyword, setKeyword] = useState('')

    const { fetchUsers } = useBody()

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                ref.current &&
                !ref.current.contains(event.target) &&
                refInput.current &&
                !refInput.current.contains(event.target)
            ) {
                setSearching(false)
                setKeyword('')
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref])

    const handleSearchKeywordChange = (e) => {
        setKeyword(e.target.value)
        if (refTimeout.current) clearTimeout(refTimeout.current)
        refTimeout.current = setTimeout(() => fetchUsers(e.target.value), 600)
    }

    return (
        <>
            <div className="p-2 mt-1 mb-3 flex items-center space-x-1 z-10 ">
                {searching && (
                    <button
                        type="button"
                        className="rounded-full focus:outline-none fb-hover-bg-dark w-9 h-9 p-1"
                        onClick={() => setSearching(false)}
                    >
                        <LeftArrow />
                    </button>
                )}
                <input
                    ref={refInput}
                    type="text"
                    value={keyword}
                    onChange={(e) => handleSearchKeywordChange(e)}
                    className={classNames(
                        'h-9 rounded-full focus:outline-none fb-bg-dark-2 p-2 px-3',
                        {
                            'w-20 md:w-full': !searching,
                        }
                    )}
                    placeholder="Search Message"
                    onFocus={() => setSearching(true)}
                />
            </div>
            <div
                className="relative z-10 h-full"
                ref={ref}
                // onClick={() => setSearching(false)}
            >
                <ListConversations />
                {searching && <ListSearchUsers keyword={keyword} />}
            </div>
        </>
    )
}

const Body = () => (
    <ProvideBody>
        <BodyImpl />
    </ProvideBody>
)

export default Body
