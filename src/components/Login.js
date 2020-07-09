import React from 'react'
import Axios from 'axios'
import { autenticar } from '../services/UserService'
import { Button, TextField, Checkbox, FormControl, Box } from '@material-ui/core'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.BASE_URL = "http://localhost:1998"
        this.state = { login: null, senha: null, token: this.props.token }
    }

    handleChange = (item) => {
        this.setState({
            [item.target.name]: item.target.value
        })
    }

    loadUsers = (e) => {
        Axios.get(this.BASE_URL + '/usuarios', { headers: { authorization: this.state.token } }).then((res) => {
            console.log(res);
        }).catch((error) => {
        });
    }

    login = (e) => {
        e.preventDefault();

        autenticar({ login: this.state.login, senha: this.state.senha }, res => {
            this.setState({
                token: res.data.token
            });
            localStorage.setItem('tokenAuth', res.data.token)
            this.props.handleToken(this.state.token)
            this.props.history.push('/clientes')
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
            <FormControl>
                <TextField id="standard-basic" type="text" name="login" label="Email" onChange={this.handleChange} />
                <TextField id="standard-basic" type="password" name="senha" label="Senha" onChange={this.handleChange} />
                <Button onClick={this.login} variant="contained" color="primary" type="submit">Entrar</Button>
            </FormControl>
        </div>
    }
}