import React from 'react'
import { addClientes } from '../../services/ClienteService'
import axios from 'axios'

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

    render() {
        return <div><div>
            <form onSubmit={this.addCliente}>
                <input type="text" name="nome" onChange={this.handleChange}></input>
                <input type="text" name="cidade" onChange={this.handleChange}></input>
                <input type="text" name="uf" onChange={this.handleChange}></input>
                <input type="text" name="pais" onChange={this.handleChange}></input>
                <button type="submit" >Adicionar</button>
            </form>
            {/* {this.state.cliente.nome ? this.state.cliente.nome : ''}
            {this.state.cliente.cidade ? this.state.cliente.nome : ''}
            {this.state.cliente.uf ? this.state.cliente.nome : ''}
            {this.state.cliente.pais ? this.state.cliente.nome : ''} */}
        </div></div>
    }
}