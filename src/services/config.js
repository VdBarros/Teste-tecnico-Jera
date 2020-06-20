import axios from 'axios'
//Baseurl para conectar a api
export const http = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})