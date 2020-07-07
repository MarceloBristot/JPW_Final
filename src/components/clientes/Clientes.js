import React from 'react'
import ClienteModel from './ClienteModel'
import { getClientes, deleteClientes } from '../../services/ClienteService'
import axios from 'axios'

export default class Clientes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clientes: [],
            token: this.props.token
        }
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

    render() {
        return (
            <div>
                <div>
                    Adicionar: <ClienteModel token={this.state.token}></ClienteModel>
                </div>
                <div> Aqui:
                 {this.state.clientes.map((item) => {
                    return <div className="row" key={item._id}>
                        <div className="col col-1 dados">
                        </div>
                        <div className="col dados">{item.nome}</div>
                        <div className="col dados">{item.cidade}</div>
                        <div className="col dados">{item.uf}</div>
                        <div className="col dados">{item.pais}</div>
                        <button type="button">Editar</button>
                        <button type="button" onClick={this.delete.bind(this,item._id)}>Excluír</button>
                    </div>
                })}
                </div>
            </div>
        )
    }
}