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
            vesrsao: "",
            id: this.props.location.state ? this.props.location.state.id : null,
            //},
            token: this.props.token
        }
    }

    componentDidMount = () => {
        if (this.state.id) {
            axios.get('http://localhost:1998/produtos/' + this.state.id, { headers: { authorization: this.state.token } }).then((res) => {
                this.setState({
                    nome: res.data.nome,
                    versao: res.data.versao,
                    cliente: res.data.cliente,
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
    addProduto = () => {
        if (this.state.nome == "" || this.state.versao == null) {
            alert("Favor preencher todos os campos!");
            return;
        }

        if (this.state.id) {
            axios.put('http://localhost:1998/produtos/' + this.state.id, this.state, { headers: { authorization: this.props.token } }).then((res) => {
                this.props.history.push('/produtos');
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            axios.post('http://localhost:1998/produtos', this.state, { headers: { authorization: this.props.token } }).then((res) => {
                this.props.history.push('/produtos');
            }).catch((error) => {
                console.log(error);
            })
        }
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
                {/* label="Nome" */}
                <TextField id="standard-basic" required="true" type="text" name="nome" value={this.state.nome} onChange={this.handleChange} />
                Nome
                <TextField id="standard-basic" required="true" type="text" name="versao" value={this.state.versao} onChange={this.handleChange} />
                Versão
                <br></br>
                <Button onClick={this.addProduto} variant="contained" color="primary" type="submit">Adicionar</Button>
            </FormControl>

        </div>
    }
}