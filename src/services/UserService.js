import axios from 'axios'

const BASE_URL = 'http://localhost:1998'

export const autenticar = (data, success, onError) => {
    axios.post(BASE_URL + '/usuarios/entrar', data).then((res) => {
        success(res);
    }).catch((error)=>{
        alert(error);
    })
}