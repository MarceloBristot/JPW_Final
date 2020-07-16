import React from 'react'
import { Button, Toolbar, AppBar, Typography } from '@material-ui/core'

export default class Header extends React.Component {

    logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant='h5'>Gestão de Projetos</Typography>
                    <Button color="inherit" href="/alteracoes">Alterações</Button>
                    <Button color="inherit" href="/clientes">Clientes</Button>
                    <Button color="inherit" href="/projetos">Projetos</Button>
                    <Button color="inherit" href="/produtos">Produtos</Button>
                    <Button color="inherit" href="/usuarios">Usuários</Button>
                    <Button style={{ marginLeft: "auto" }} color="inherit" href="/" onClick={this.logout}>Sair</Button>
                </Toolbar>
            </AppBar>
        )
    }
}
