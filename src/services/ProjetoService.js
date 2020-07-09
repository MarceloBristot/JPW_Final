import axios from 'axios'

const BASE_URL = 'http://localhost:1998'

export const getProjetos = (token, success, onError) => {
    axios.get(BASE_URL + '/projetos', { headers: { authorization: token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}

export const addProjetos = (data, success, onError) => {
    axios.post(BASE_URL + '/projetos', data, { headers: { authorization: data.token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}

export const deleteProjetos = (data, success, onError) => {
    axios.delete(BASE_URL + '/projetos/' + data._id, { headers: { authorization: data.token } }).then((res) => {
        success(res);
    }).catch((error) => {
        console.log(error);
    })
}