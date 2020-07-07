import axios from 'axios'

const BASE_URL = 'http://localhost:1998'

export const getClientes = (token, success, onError) => {
    axios.get(BASE_URL + '/clientes', { headers: { authorization: token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}

export const addClientes = (data, success, onError) => {
    axios.post(BASE_URL + '/clientes', data, { headers: { authorization: data.token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}

export const deleteClientes = (data, success, onError) => {
    axios.delete(BASE_URL + '/clientes/' + data._id, { headers: { authorization: data.token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}