import axios from 'axios'

// Register user
const register = async (userData) => {
  const response = await axios.post('http://localhost:5000/api/register', userData)

  if (response.status===200) {
    localStorage.setItem('user', JSON.stringify(response.data))
    console.log(response.data)
  }
  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post('http://localhost:5000/api/login', userData)

  if (response.status===200) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
