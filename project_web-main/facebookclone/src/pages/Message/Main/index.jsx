import React, { useRef } from 'react'

// relative
import Header from './Header'
import Detail from './Detail'
import Body from './Body'
import { ProvideMain } from './contexts'
import Footer from './Footer'

const MainImpl = () => {
    const inputRef = useRef(null)
    return (
        <>
            <div className="flex flex-col flex-grow h-full">
                <div className="px-4 py-3 flex items-center border-b border-gray-700 space-x-2">
                    <Header />
                </div>
                <div
                    className="flex flex-col-reverse overflow-auto flex-grow"
                    onClick={() => inputRef.current.focus()}
                    role="none"
                >
                    <Body />
                </div>
                <div className="flex items-end p-3 space-x-1">
                    <Footer ref={inputRef} />
                </div>
            </div>
            <Detail />
        </>
    )
}

function Main() {
    return (
        <ProvideMain>
            <MainImpl />
        </ProvideMain>
    )
}

export default Main
