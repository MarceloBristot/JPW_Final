import axios from 'axios'

const BASE_URL = 'http://localhost:1998'

export const getProdutos = (token, success, onError) => {
    axios.get(BASE_URL + '/produtos', { headers: { authorization: token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}

export const addProdutos = (data, success, onError) => {
    axios.post(BASE_URL + '/produtos', data, { headers: { authorization: data.token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}

export const deleteProdutos = (data, success, onError) => {
    axios.delete(BASE_URL + '/produtos/' + data._id, { headers: { authorization: data.token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}