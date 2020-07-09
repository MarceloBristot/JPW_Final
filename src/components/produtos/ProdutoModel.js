import React from 'react'
import { addProdutos, getProdutos } from '../../services/ProdutoService'
import axios from 'axios'
import { Button, TextField, Checkbox, FormControl, Box } from '@material-ui/core'
export default class ProdutoModel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //cliente: this.props.cliente ? this.props.cliente : {
            nome: "",
            vesrsao: ""
            //},
            //token: this.props.token
        }
    }

    handleChange = (item) => {
        this.setState({
            [item.target.name]: item.target.value
        })
    }

    addProduto = () => {
        //e.preventDefault();
        axios.post('http://localhost:1998/produtos', this.state, { headers: { authorization: this.props.token } }).then((res) => {
            this.getAllProdutos();
        }).catch((error) => {
            console.log(error);
        })
    }

    getAllProdutos = () => {
        getProdutos(this.state.token, (res) => {
            this.setState({
                produtos: [...res.data]
            });
        }, (error) => {
            console.log(error)

        })
    }

    render() {
        return <div>
            <FormControl>
                <TextField id="standard-basic" required="true" type="text" name="nome" label="Nome" onChange={this.handleChange} />
                <TextField id="standard-basic" type="text" name="versao"label="Versão" onChange={this.handleChange} />
                <Button onClick={this.addProduto} variant="contained" color="primary" type="submit">Adicionar</Button>
            </FormControl>

        </div>
    }
}