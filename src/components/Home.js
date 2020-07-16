import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './Login'
import Clientes from './clientes/Clientes'
import Produtos from './produtos/Produtos'
import Usuarios from './usuarios/Usuarios'
import Header from './Header'
import { Container, Box } from "@material-ui/core";
import Projetos from './projetos/Projetos'
import ProjetoModel from './projetos/ProjetoModel'
import UsuarioModel from './usuarios/UsuarioModel'
import ProdutoModel from './produtos/ProdutoModel'
import ClienteModel from './clientes/ClienteModel'

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
            <div>
                <head>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                </head>
            </div>
            <Box>
                <Header></Header>
                <Container>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path={'/'} render={props => <Login {...props} handleToken={this.handleToken} />} />
                            <Route exact path={'/entrar'} render={props => <UsuarioModel {...props} />} />
                            <Route exact path={'/clientes'} render={props => <Clientes {...props} token={this.state.token} />} />
                            <Route exact path={'/editarcliente'} render={props => <ClienteModel {...props} token={this.state.token} />} />
                            <Route exact path={'/usuarios'} render={props => <Usuarios {...props} token={this.state.token} />} />
                            <Route exact path={'/editarusuario'} render={props => <UsuarioModel {...props} token={this.state.token} />} />
                            <Route exact path={'/projetos'} render={props => <Projetos {...props} token={this.state.token} />} />
                            <Route exact path={'/editarprojeto'} render={props => <ProjetoModel {...props} token={this.state.token} />} />
                            <Route exact path={'/produtos'} render={props => <Produtos {...props} token={this.state.token} />} />
                            <Route exact path={'/editarproduto'} render={props => <ProdutoModel {...props} token={this.state.token} />} />
                        </Switch>
                    </BrowserRouter>
                </Container>
            </Box>
        </div>
    }
}