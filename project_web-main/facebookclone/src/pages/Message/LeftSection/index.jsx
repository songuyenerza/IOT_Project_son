import React, { useMemo } from 'react'
import Header from './Header'
import Body from './Body'

const LeftSection = () => {
    const memoHeader = useMemo(() => <Header />, [])
    const memeBody = useMemo(() => <Body />, [])
    return (
        <div className="w-24 lg:w-96 border-r border-gray-700 flex flex-col">
            {memoHeader}
            {memeBody}
        </div>
    )
}

export default LeftSection
