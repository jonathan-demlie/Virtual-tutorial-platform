import axios from 'axios'

// post education 
const create = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post('http://localhost:5000/api/education', data,config)

    return response.data
}

// Show education of single user
const show = async (id,token) => {
    const response = await axios.get(`http://localhost:5000/api/education/${id}`)

    return response.data
}

//Update education
const update = async(id,data,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(`http://localhost:5000/api/education/${id}`,data,config)
    return response.data
}

//delete education
const remove = async(id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(`http://localhost:5000/api/education/${id}`,config)

    return response.data
}
const educationService = {
    create,
    show,
    update,
    remove,
}

export default educationService
