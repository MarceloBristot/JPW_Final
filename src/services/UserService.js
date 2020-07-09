import axios from 'axios'

const BASE_URL = 'http://localhost:1998'

export const autenticar = (data, success, onError) => {
    axios.post(BASE_URL + '/usuarios/entrar', data).then((res) => {
        success(res);
    }).catch((error)=>{
        alert(error);
    })
}

export const getUsuarios = (token, success, onError) => {
    axios.get(BASE_URL + '/usuarios', { headers: { authorization: token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}

export const addUsuarios = (data, success, onError) => {
    axios.post(BASE_URL + '/usuarios', data, { headers: { authorization: data.token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}

export const deleteUsuarios = (data, success, onError) => {
    axios.delete(BASE_URL + '/usuarios/' + data._id, { headers: { authorization: data.token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}