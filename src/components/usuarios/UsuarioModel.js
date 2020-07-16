import React from 'react'
import { addUsuarios, getUsuarios } from '../../services/UserService'
import axios from 'axios'
import { Button, TextField, Checkbox, FormControl, Box } from '@material-ui/core'
export default class UsuarioModel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nome: "",
            login: "",
            sigla: "",
            senha: "",
            id: this.props.location.state ? this.props.location.state.id : null,
            //},
            token: this.props.token
        }
    }

    componentDidMount = () => {
        if (this.state.id) {
            axios.get('http://localhost:1998/usuarios/' + this.state.id, { headers: { authorization: this.state.token } }).then((res) => {
                this.setState({
                    nome: res.data.nome,
                    login: res.data.login,
                    sigla: res.data.sigla,
                    senha: res.data.senha
                });
            }).catch((error) => {
                console.log(error);
            })
        }

    }

    handleChange = (item) => {
        this.setState({
            [item.target.name]: item.target.value
        })
    }

    addUsuario = () => {
        if (this.state.nome == "" || this.state.sigla == null || this.state.login == null) {
            alert("Favor preencher todos os campos!");
            return;
        }

        if (this.state.id) {
            axios.put('http://localhost:1998/usuarios/' + this.state.id, this.state, { headers: { authorization: this.props.token } }).then((res) => {
                this.props.history.push('/usuarios');
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            //e.preventDefault();
            axios.post('http://localhost:1998/usuarios', this.state, { headers: { authorization: this.props.token } }).then((res) => {
                this.props.history.push('/usuarios');
            }).catch((error) => {
                console.log(error);
            })
        }
    }


    getAllUsuarios = () => {
        getUsuarios(this.state.token, (res) => {
            this.setState({
                usuarios: [...res.data]
            });
        }, (error) => {
            console.log(error)

        })
    }

    render() {
        return <div>
            <FormControl>
                <TextField id="standard-basic" required="true" type="text" name="nome" value={this.state.nome} onChange={this.handleChange} />
                Nome 
                <TextField id="standard-basic" type="text" name="sigla" value={this.state.sigla} onChange={this.handleChange} />
                Sigla
                <TextField id="standard-basic" type="text" name="login" value={this.state.login}  onChange={this.handleChange} />
                Login
                <TextField disable={this.props.location.state} id="standard-basic" type="password" name="senha" value={this.state.senha} onChange={this.handleChange} />
                Senha
                <Button onClick={this.addUsuario} variant="contained" color="primary" type="submit">Adicionar</Button>
            </FormControl>
        </div>
    }
}