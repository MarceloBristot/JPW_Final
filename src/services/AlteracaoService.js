import axios from 'axios'

const BASE_URL = 'http://localhost:1998'

export const getAlteracoes = (token, success, onError) => {
    axios.get(BASE_URL + '/alteracoes', { headers: { authorization: token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}

export const addAlteracoes = (data, success, onError) => {
    axios.post(BASE_URL + '/alteracoes', data, { headers: { authorization: data.token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}

export const deleteAlteracoes = (data, success, onError) => {
    axios.delete(BASE_URL + '/alteracoes/' + data._id, { headers: { authorization: data.token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}