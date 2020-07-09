import React from 'react'
import { addUsuarios, getUsuarios } from '../../services/UserService'
import axios from 'axios'
import { Button, TextField, Checkbox, FormControl, Box } from '@material-ui/core'
export default class UsuarioModel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nome: "",
            cidade: "",
            uf: "",
            pais: ""
            //},
            //token: this.props.token
        }
    }

    handleChange = (item) => {
        this.setState({
            [item.target.name]: item.target.value
        })
    }

    addUsuario = () => {
        //e.preventDefault();
        axios.post('http://localhost:1998/usuarios', this.state, { headers: { authorization: this.props.token } }).then((res) => {
            this.getAllUsuarios();
        }).catch((error) => {
            console.log(error);
        })
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
                <TextField id="standard-basic" required="true" type="text" name="nome" label="Nome" onChange={this.handleChange} />
                <TextField id="standard-basic" type="text" name="cidade"label="Cidade" onChange={this.handleChange} />
                <TextField id="standard-basic" type="text" name="uf" label="UF" onChange={this.handleChange} />
                <TextField id="standard-basic" type="text" name="pais" label="País" onChange={this.handleChange} />
                <Button onClick={this.addUsuario} variant="contained" color="primary" type="submit">Adicionar</Button>
            </FormControl>
        </div>
    }
}