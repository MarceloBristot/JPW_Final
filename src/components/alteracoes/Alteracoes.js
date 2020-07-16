import React from 'react'
import { getAlteracoes, deleteAlteracoes } from '../../services/AlteracaoService'
import { getProdutos } from '../../services/ProdutoService'
import { getClientes } from '../../services/ClienteService'
import axios from 'axios'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { getUsuarios } from '../../services/UserService'

export default class Alteracoes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            alteracoes: [],
            token: this.props.token
        }
        if (!this.state.token)
            this.props.history.push('/')
    }
    componentDidMount = () => {
        this.getAllAlteracoes()
    }

    getAllAlteracoes = () => {
        var arrProd = [];
        var arrCli = [];
        getProdutos(this.props.token, (res) => {
            arrProd = res.data;
        }, (error) => {
            console.log(error)
        })

        getUsuarios(this.props.token, (res) => {
            arrCli = res.data;
        }, (error) => {
            console.log(error)
        })

        getAlteracoes(this.state.token, (res) => {

            res.data.forEach(element => {
                arrProd.forEach(a => {
                    if (element.produto == a._id)
                        element.nomeProduto = a.nome;
                })
                arrCli.forEach(a => {
                    if (element.usuario == a._id)
                        element.nomeCliente = a.nome;
                })
            });

            this.setState({
                alteracoes: [...res.data]
            });
        }, (error) => {
            console.log(error)
        })
    }

    delete = (id) => {
        axios.delete('http://localhost:1998/alteracoes/' + id, { headers: { authorization: this.state.token } }).then((res) => {
            this.getAllAlteracoes();
        }).catch((error) => {
            console.log(error);
        })
    }
    editar = (id) => {
        this.props.history.push({ pathname: '/editaralteracao', state: { id: id } })
    }

    adicionar = (id) => {
        this.props.history.push('/editaralteracao')
    }

    render() {
        return (
            <div>
                <div>
                    <br></br>
                    <TableContainer component={Paper}>
                        <Table className="row" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Comentário</TableCell>
                                    <TableCell align="center">Usuário</TableCell>
                                    <TableCell align="center">Produto</TableCell>
                                    <TableCell align="center">
                                        <Button type="button" variant="contained" color="primary" onClick={this.adicionar}>Adicionar</Button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.alteracoes.map((item) => (
                                    <TableRow key={item._id}>
                                        {/* <TableCell component="th" scope="row">
                                                {item._id}
                                            </TableCell> */}
                                        <TableCell align="center">{item.comentarios}</TableCell>
                                        <TableCell align="center">{item.nomeCliente}</TableCell>
                                        <TableCell align="center">{item.nomeProduto}</TableCell>
                                        <TableCell align="center">
                                            <Button type="button" variant="contained" onClick={this.editar.bind(this, item._id)}>Editar</Button>
                                            <Button type="button" variant="contained" color="secondary" onClick={this.delete.bind(this, item._id)}>Excluír</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* <ProjetoModel token={this.state.token}></ProjetoModel> */}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
}