import React from 'react'
import ProdutoModel from './ProdutoModel'
import { getProdutos, deleteProdutos } from '../../services/ProdutoService'
import axios from 'axios'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

export default class Produtos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            produtos: [],
            token: this.props.token
        }
        if (!this.state.token)
            this.props.history.push('/')
    }
    componentDidMount = () => {
        this.getAllProdutos()
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

    delete = (id) => {
        axios.delete('http://localhost:1998/produtos/' + id, { headers: { authorization: this.state.token } }).then((res) => {
            this.getAllProdutos();
        }).catch((error) => {
            console.log(error);
        })
    }

    editar = (id) => {
        this.props.history.push({ pathname: '/editarproduto', state: { id: id } })
    }

    adicionar = (id) => {
        this.props.history.push('/editarproduto')
    }

    render() {
        return (
            <div>
                <div>
                    <TableContainer component={Paper}>
                        <Table className="row" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Nome</TableCell>
                                    <TableCell align="center">Versão</TableCell>
                                    <TableCell align="center">
                                        <Button type="button" variant="contained" color="primary" onClick={this.adicionar}>Adicionar</Button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.produtos.map((item) => (
                                    <TableRow key={item._id}>
                                        {/* <TableCell component="th" scope="row">
                                                {item._id}
                                            </TableCell> */}
                                        <TableCell align="center">{item.nome}</TableCell>
                                        <TableCell align="center">{item.versao}</TableCell>
                                        <TableCell align="center">
                                            <Button type="button" variant="contained" onClick={this.editar.bind(this, item._id)}>Editar</Button>
                                            <Button type="button" variant="contained" color="secondary" onClick={this.delete.bind(this, item._id)}>Excluír</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* <ProdutoModel token={this.state.token}></ProdutoModel> */}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
}