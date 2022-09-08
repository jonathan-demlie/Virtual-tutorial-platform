import axios from 'axios'

// Create user Profile
const create = async (userData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(`http://localhost:5000/api/profile`, userData,config)

  return response.data
}

// show user Profile
const show = async (userId,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`http://localhost:5000/api/profile/${userId}`,config)
  
  return response.data
}

// update user Profile
const update = async (userId,userData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`http://localhost:5000/api/profile/${userId}`, userData,config)

  return response.data
}

const profileService = {
  create,
  show,
  update,
}

export default profileService
