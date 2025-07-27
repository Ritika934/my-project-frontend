import axios from "axios"

const axiosclient = axios.create({

    baseURL:'https://my-project-frontend-i27dt9nha-ritika-parmars-projects.vercel.app',
    withCredentials:true,
    headers:{
        'Content-Type':'application/json'
    }
})

export default axiosclient; 
