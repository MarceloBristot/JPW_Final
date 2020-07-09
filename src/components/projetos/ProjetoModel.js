import React from 'react'
import { addProjetos, getProjetos } from '../../services/ProjetoService'
import { getProdutos } from '../../services/ProdutoService'
import { getClientes } from '../../services/ClienteService'
import axios from 'axios'
import { Button, TextField, Checkbox, FormControl, Box, InputLabel, Select } from '@material-ui/core'
export default class ProjetoModel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //projeto: this.props.projeto ? this.props.projeto : {
            nome: "",
            produto: null,
            cliente: null,
            uf: "",
            pais: "",
            produtos: [],
            clientes: []
            //},
            //token: this.props.token
        }
    }

    componentDidMount = () => {
        getProdutos(this.props.token, (res) => {
            var arrTen = [];
            res.data.forEach(element => {
                arrTen.push(<option key={element._id} value={element._id}> {element.nome} </option>);
            });
            this.setState({
                produtos: arrTen
            });
        }, (error) => {
            console.log(error)
        })

        getClientes(this.props.token, (res) => {
            var arrTen = [];
            res.data.forEach(element => {
                arrTen.push(<option key={element._id} value={element._id}> {element.nome} </option>);
            });
            this.setState({
                clientes: arrTen
            });
        }, (error) => {
            console.log(error)
        })

    }

    handleChange = (item) => {
        this.setState({
            [item.target.name]: item.target.value
        })
    }

    addProjeto = () => {
        //e.preventDefault();
        axios.post('http://localhost:1998/projetos', this.state, { headers: { authorization: this.props.token } }).then((res) => {
            this.getAllProjetos();
        }).catch((error) => {
            console.log(error);
        })
    }

    getAllProjetos = () => {
        getProjetos(this.state.token, (res) => {
            this.setState({
                projetos: [...res.data]
            });
        }, (error) => {
            console.log(error)
        })
    }

    render() {
        return <div>
            <FormControl>
                <TextField id="standard-basic" type="text" name="nome" label="Nome" onChange={this.handleChange} />
                <InputLabel>Produto</InputLabel>
                <Select
                    native
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'produto',
                        id: 'produto',
                    }}
                >
                    <option aria-label="None" value="" />
                    {this.state.produtos}
                </Select>
                <Select
                    native
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'cliente',
                        id: 'cliente',
                    }}
                >
                    <option aria-label="None" value="" />
                    {this.state.clientes}
                </Select>
                <Button onClick={this.addProjeto} variant="contained" color="primary" type="submit">Adicionar</Button>
            </FormControl>
        </div>
    }
}