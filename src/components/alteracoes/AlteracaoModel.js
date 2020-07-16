import React from 'react'
import { addProjetos, getProjetos, getProjeto } from '../../services/ProjetoService'
import { addAlteracoes, getAlteracoes, deleteAlteracoes } from '../../services/AlteracaoService'
import { getProdutos } from '../../services/ProdutoService'
import { getClientes } from '../../services/ClienteService'
import axios from 'axios'
import { Button, TextField, Checkbox, FormControl, Box, InputLabel, Select } from '@material-ui/core'
export default class AlteracaoModel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //projeto: this.props.projeto ? this.props.projeto : {
            comentario: "",
            produto: null,
            cliente: null,
            produtos: [],
            clientes: [],
            comentarios: [],
            usuario: null,
            id: this.props.location.state ? this.props.location.state.id : null,
            //},
            token: this.props.token
        }

        function parseJwt(token) {
            if (!token) { return; }
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64)).id;
        }

        this.state.usuario = (parseJwt(this.props.token))
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

        if (this.state.id) {
            axios.get('http://localhost:1998/alteracoes/' + this.state.id, { headers: { authorization: this.state.token } }).then((res) => {
                var comment = '';
                res.data.comentarios.forEach(com => {
                    comment = com;
                })

                this.setState({
                    comentario: comment.conteudo,
                    produto: res.data.produto,
                    // cliente: res.data.cliente,
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

    addAlteracao = () => {
        if (this.state.comentario == "" || this.state.produto == null) {//} || this.state.cliente == null) {
            alert("Favor preencher todos os campos!");
            return;
        }
        this.state.comentarios.push({ conteudo: this.state.comentario })

        if (this.state.id) {
            axios.put('http://localhost:1998/alteracoes/' + this.state.id, this.state, { headers: { authorization: this.props.token } }).then((res) => {
                this.props.history.push('/alteracoes');
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            //e.preventDefault();
            axios.post('http://localhost:1998/alteracoes', this.state, { headers: { authorization: this.props.token } }).then((res) => {
                this.props.history.push('/alteracoes');
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    getAllAlteracoes = () => {
        getAlteracoes(this.state.token, (res) => {
            this.setState({
                alteracoes: [...res.data]
            });
        }, (error) => {
            console.log(error)
        })
    }

    render() {
        return <div>
            <FormControl>
                <TextField id="standard-basic" type="text" name="comentario" value={this.state.comentario} onChange={this.handleChange} />
                {/* <InputLabel>Produto</InputLabel> */}
                Comentario
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
                Produto
                <br></br>

                {/* <InputLabel>Cliente</InputLabel> */}
                {/* <Select
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
                Cliente */}
                <Button onClick={this.addAlteracao} variant="contained" color="primary" type="submit">Adicionar</Button>
            </FormControl>
        </div>
    }
}