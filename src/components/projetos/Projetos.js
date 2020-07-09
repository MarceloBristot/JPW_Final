import React from 'react'
import ProjetoModel from './ProjetoModel'
import { getProjetos, deleteProjetos } from '../../services/ProjetoService'
import { getProdutos } from '../../services/ProdutoService'
import { getClientes } from '../../services/ClienteService'
import axios from 'axios'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

export default class Projetos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projetos: [],
            token: this.props.token
        }
        if (!this.state.token)
            this.props.history.push('/')
    }
    componentDidMount = () => {
        this.getAllProjetos()
    }

    getAllProjetos = () => {
        var arrProd = [];
        var arrCli = [];
        getProdutos(this.props.token, (res) => {
            arrProd = res.data;
        }, (error) => {
            console.log(error)
        })

        getClientes(this.props.token, (res) => {
            arrCli = res.data;
        }, (error) => {
            console.log(error)
        })

        getProjetos(this.state.token, (res) => {

            res.data.forEach(element => {
                arrProd.forEach(a => {
                    if (element.produto == a._id)
                        element.nomeProduto = a.nome;
                })
                arrCli.forEach(a => {
                    if (element.cliente == a._id)
                        element.nomeCliente = a.nome;
                })
            });

            this.setState({
                projetos: [...res.data]
            });
        }, (error) => {
            console.log(error)
        })
    }

    delete = (id) => {
        axios.delete('http://localhost:1998/projetos/' + id, { headers: { authorization: this.state.token } }).then((res) => {
            this.getAllProjetos();
        }).catch((error) => {
            console.log(error);
        })
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
                                    <TableCell align="center">Cliente</TableCell>
                                    <TableCell align="center">Produto</TableCell>
                                    <TableCell align="center">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.projetos.map((item) => (
                                    <TableRow key={item._id}>
                                        {/* <TableCell component="th" scope="row">
                                                {item._id}
                                            </TableCell> */}
                                        <TableCell align="center">{item.nome}</TableCell>
                                        <TableCell align="center">{item.nomeCliente}</TableCell>
                                        <TableCell align="center">{item.nomeProduto}</TableCell>
                                        <TableCell align="center">
                                            <Button type="button" variant="contained">Editar</Button>
                                            <Button type="button" variant="contained" color="secondary" onClick={this.delete.bind(this, item._id)}>Excluír</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <ProjetoModel token={this.state.token}></ProjetoModel>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
}