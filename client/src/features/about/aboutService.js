import axios from 'axios'

// post education 
const create = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post('http://localhost:5000/api/about', data,config)
    return response.data
}

// Show education of single user
const show = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/about/${id}`)
    return response.data
}

//Update education
const update = async(id,data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(`http://localhost:5000/api/about/${id}`,data,config)
    return response.data
}


const aboutService = {
    create,
    show,
    update,
}

export default aboutService
