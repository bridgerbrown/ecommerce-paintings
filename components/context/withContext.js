import React from 'react'
import Context from './UserContext'

const withContext = WrappedComponent => {
    const WithHOC = props => {
        return (
            <Context.Consumer>
                {context => <WrappedComponent {...props} context={context} />}
            </Context.Consumer>
        )
    }
    return WithHOC
}

export default withContext