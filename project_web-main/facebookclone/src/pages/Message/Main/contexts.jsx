import React, { useContext, createContext } from 'react'
import PropTypes from 'prop-types'

import useProvideMain from './hooks/index'

const mainContext = createContext()

function ProvideMain({ children }) {
    const main = useProvideMain()
    return <mainContext.Provider value={main}>{children}</mainContext.Provider>
}
ProvideMain.propTypes = {
    children: PropTypes.node.isRequired,
}

function useMain() {
    return useContext(mainContext)
}

export { ProvideMain, useMain }
