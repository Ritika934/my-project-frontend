import axios from "axios"

const axiosclient = axios.create({

    baseURL:'https://project-backend-ashy-mu.vercel.app',
    withCredentials:true,
    headers:{
        'Content-Type':'application/json'
    }
})

export default axiosclient; 
