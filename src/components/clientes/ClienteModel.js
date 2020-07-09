import React from 'react'
import { addClientes, getClientes } from '../../services/ClienteService'
import axios from 'axios'
import { Button, TextField, Checkbox, FormControl, Box } from '@material-ui/core'
export default class ClienteModel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //cliente: this.props.cliente ? this.props.cliente : {
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

    addCliente = () => {
        //e.preventDefault();
        axios.post('http://localhost:1998/clientes', this.state, { headers: { authorization: this.props.token } }).then((res) => {
            this.getAllClientes();
        }).catch((error) => {
            console.log(error);
        })
    }

    getAllClientes = () => {
        getClientes(this.state.token, (res) => {
            this.setState({
                clientes: [...res.data]
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
                <Button onClick={this.addCliente} variant="contained" color="primary" type="submit">Adicionar</Button>
            </FormControl>
            {/* {this.state.cliente.nome ? this.state.cliente.nome : ''}
            {this.state.cliente.cidade ? this.state.cliente.nome : ''}
            {this.state.cliente.uf ? this.state.cliente.nome : ''}
            {this.state.cliente.pais ? this.state.cliente.nome : ''} */}
        </div>
    }
}