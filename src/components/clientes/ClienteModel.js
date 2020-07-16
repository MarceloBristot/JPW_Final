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
            pais: "",
            id: this.props.location.state ? this.props.location.state.id : null,
            //},
            token: this.props.token
        }
    }

    componentDidMount = () => {
        if (this.state.id) {
            axios.get('http://localhost:1998/clientes/' + this.state.id, { headers: { authorization: this.state.token } }).then((res) => {
                this.setState({
                    nome: res.data.nome,
                    cidade: res.data.cidade,
                    uf: res.data.uf,
                    pais: res.data.pais,
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

    addCliente = () => {
        if (this.state.nome == "" || this.state.cidade == null || this.state.uf == null) {
            alert("Favor preencher todos os campos!");
            return;
        }

        if (this.state.id) {
            axios.put('http://localhost:1998/clientes/' + this.state.id, this.state, { headers: { authorization: this.props.token } }).then((res) => {
                this.props.history.push('/clientes');
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            //e.preventDefault();
            axios.post('http://localhost:1998/clientes', this.state, { headers: { authorization: this.props.token } }).then((res) => {
                this.props.history.push('/clientes');
            }).catch((error) => {
                console.log(error);
            })
        }
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
                <TextField id="standard-basic" required="true" type="text" name="nome"  value={this.state.nome} onChange={this.handleChange} />
                Nome
                <TextField id="standard-basic" type="text" name="cidade" value={this.state.cidade} onChange={this.handleChange} />
                Cidade
                <TextField id="standard-basic" type="text" name="uf" value={this.state.uf} onChange={this.handleChange} />
                UF
                <TextField id="standard-basic" type="text" name="pais" value={this.state.pais} onChange={this.handleChange} />
                País<Button onClick={this.addCliente} variant="contained" color="primary" type="submit">Adicionar</Button>
            </FormControl>
            {/* {this.state.cliente.nome ? this.state.cliente.nome : ''}
            {this.state.cliente.cidade ? this.state.cliente.nome : ''}
            {this.state.cliente.uf ? this.state.cliente.nome : ''}
            {this.state.cliente.pais ? this.state.cliente.nome : ''} */}
        </div>
    }
}