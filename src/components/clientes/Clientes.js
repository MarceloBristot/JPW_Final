import React from 'react'
import ClienteModel from './ClienteModel'
import { getClientes, deleteClientes } from '../../services/ClienteService'
import axios from 'axios'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

export default class Clientes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clientes: [],
            token: this.props.token
        }
        if (!this.state.token)
            this.props.history.push('/')
    }
    componentDidMount = () => {
        this.getAllClientes()
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

    delete = (id) => {
        axios.delete('http://localhost:1998/clientes/' + id, { headers: { authorization: this.state.token } }).then((res) => {
            this.getAllClientes();
        }).catch((error) => {
            console.log(error);
        })
    }

    editar = (id) => {
        this.props.history.push({ pathname: '/editarcliente', state: { id: id } })
    }

    adicionar = (id) => {
        this.props.history.push('/editarcliente')
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
                                    <TableCell align="center">Cidade</TableCell>
                                    <TableCell align="center">UF</TableCell>
                                    <TableCell align="center">País</TableCell>
                                    <TableCell align="center">
                                        <Button type="button" variant="contained" color="primary" onClick={this.adicionar}>Adicionar</Button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.clientes.map((item) => (
                                    <TableRow key={item._id}>
                                        {/* <TableCell component="th" scope="row">
                                                {item._id}
                                            </TableCell> */}
                                        <TableCell align="center">{item.nome}</TableCell>
                                        <TableCell align="center">{item.cidade}</TableCell>
                                        <TableCell align="center">{item.uf}</TableCell>
                                        <TableCell align="center">{item.pais}</TableCell>
                                        <TableCell align="center">
                                            <Button type="button" variant="contained" onClick={this.editar.bind(this, item._id)}>Editar</Button>
                                            <Button type="button" variant="contained" color="secondary" onClick={this.delete.bind(this, item._id)}>Excluír</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
}