import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './Login'
import Clientes from './clientes/Clientes'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: localStorage.getItem('tokenAuth')
        }
    }

    handleToken = (token) => {
        this.setState({
            token: token
        })
    }

    render() {
        return <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} render={props => <Login {...props} handleToken={this.handleToken} />} />
                    <Route exact path={'/entrar'}></Route>
                    <Route exact path={'/home'}></Route>
                    <Route exact path={'/clientes'} render={props => <Clientes {...props} token={this.state.token} />} />
                </Switch></BrowserRouter>
        </div>
    }
}