import React from 'react'
import Axios from 'axios'
import { autenticar } from '../services/UserService'

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
            <form onSubmit={this.login}>
                <span>Email </span>
                <input type="text" name="login" onChange={this.handleChange}></input>
                <br></br>
                <span>Senha </span>
                <input type="password" name="senha" onChange={this.handleChange}></input>
                <button type="submit">Entrar</button>
            </form>
        </div>
    }
}