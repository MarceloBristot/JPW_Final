import React from 'react'
import UsuarioModel from './UsuarioModel'
import { getUsuarios, deleteUsuarios } from '../../services/UserService'
import axios from 'axios'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

export default class Usuarios extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            usuarios: [],
            token: this.props.token
        }
        if (!this.state.token)
            this.props.history.push('/')
            console.log(this.props)
    }
    componentDidMount = () => {
        this.getAllUsuarios()
    }

    getAllUsuarios = () => {
        getUsuarios(this.state.token, (res) => {
            this.setState({
                usuarios: [...res.data]
            });
        }, (error) => {
            console.log(error)

        })
    }

    delete = (id) => {
        axios.delete('http://localhost:1998/usuarios/' + id, { headers: { authorization: this.state.token } }).then((res) => {
            this.getAllUsuarios();
        }).catch((error) => {
            console.log(error);
        })
    }
    editar = (id) => {
        this.props.history.push({ pathname: '/editarusuario', state: { id: id } })
    }

    adicionar = (id) => {
        this.props.history.push('/editarusuario')
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
                                    <TableCell align="center">Sigla</TableCell>
                                    <TableCell align="center">Login</TableCell>
                                    <TableCell align="center">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.usuarios.map((item) => (
                                    <TableRow key={item._id}>
                                        {/* <TableCell component="th" scope="row">
                                                {item._id}
                                            </TableCell> */}
                                        <TableCell align="center">{item.nome}</TableCell>
                                        <TableCell align="center">{item.sigla}</TableCell>
                                        <TableCell align="center">{item.login}</TableCell>
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