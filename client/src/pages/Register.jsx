import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

const Container = styled.div`
display:flex;
background-color:rgb(230, 245, 255);
width:100vw;
height:100vh;
margin:0;
padding:0;
`
const Wrapper = styled.div`
margin: 0 auto;
margin-top:20vh;
width:35vw;
height:70vh;
background-color:white;
border-radius:15px;
display:flex;
flex-direction:column;
`
const Title = styled.h2`
padding:20px 0;
text-align:center;
`
const Form = styled.form`
padding-top:3vh;
width:25vw;
display:flex;
flex-direction:column;
margin: 0 auto;
`
const Input = styled.input`
margin-top:15px;
padding:10px;
height:30px;
border-radius:5px;
border-color:black;
::placeholder {
    color: #000000;
    font-size: 1.2em;
  }  
&:focus{
    outline:none;
}
font-size:16px;
`
const Select = styled.select`
background:white;
margin-top:15px;
height:50px;
border-radius:5px;
border-color:black;
::placeholder {
    color: black;
    font-size: 1.5em;
  }  
&:focus{
    outline:none;
}
font-size:16px;
`
const Option = styled.option`
`
const Button = styled.button`
margin:20px 0; 
background-color:#2169de;
color:white;
width:25vw;
height:50px;
border-radius:10px;
border:none;
font-size:19px;
&:hover{
    cursor:pointer;
    background-color:#2169a1;
}
`
const Row = styled.div`
padding-top:5vh;
display:flex;
`
const Text = styled.p`
font-size:20px;
font-weight:400;
`
const LoginLink = styled(Link)`
padding-left:10px;
color:#2169de;
font-size:20px;
font-weight:400;
text-decoration:none;
&:hover{
    color:blue;
}
`
export default function Register() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState(null)
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordLengthError, setPasswordLengthError] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            toast.success("Registerd successfully!")
            if (user.data.role === 'student') {
                navigate('/student/dashboard')
            } else if (user.data.role === 'tutor') {
                navigate('/tutor/dashboard')
            }
        }

        dispatch(reset())
    }, [user, isLoading, isError, isSuccess, message, dispatch])
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userData = {
                firstName,
                lastName,
                email,
                role,
                password
            }
            if (firstName === '') {
                setFirstNameError(true)
            }
            if (lastName === '') {
                setLastNameError(true)
            }
            if (password === '') {
                setPasswordError(true)
            }
            if (password.length < 6 && !password.length == 0) {
                setPasswordLengthError(true)
            }
            if (firstNameError || lastNameError || passwordError || passwordLengthError) {

            }
            const regex =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if (regex.test(email)) {
                dispatch(register(userData))
            } else {
                setEmailError(true)
            }
        } catch (error) {
            console.log("login unsuccessfull!")
        }
    }
    return (
        <div>
            <Container>
                <Wrapper>
                    <Title>Register</Title>
                    <Form onSubmit={handleSubmit}>
                        <Input type={"text"} placeholder={"First Name"} onChange={e => [setFirstName(e.target.value), setFirstNameError(false)]}></Input>
                        {firstNameError && <sub style={{ color: 'red' }}>First Name field is empty!</sub>}
                        <Input type={"text"} placeholder={"Last Name"} onChange={e => [setLastName(e.target.value), setLastNameError(false)]}></Input>
                        {lastNameError && <sub style={{ color: 'red' }}>Last Name field is empty!</sub>}
                        <Input type={"email"} placeholder={"E-mail"} onChange={e => [setEmail(e.target.value), setEmailError(false)]}></Input>
                        {emailError && <sub style={{ color: 'red' }}>Enter valid E-mail address</sub>}
                        <Select name="cars" onChange={e => setRole(e.target.value)}>
                            <Option value="student">Select your role</Option>
                            <Option value="student">Student</Option>
                            <Option value="tutor">Tutor</Option>
                        </Select>
                        <Input type={"password"} placeholder={"Password"} onChange={e => [setPassword(e.target.value), setPasswordError(false), setPasswordLengthError(false)]}></Input>
                        {passwordError && <sub style={{ color: 'red' }}>Password field is empty!</sub>}
                        {passwordLengthError && <sub style={{ color: 'red' }}>Number of character must greater than Five!</sub>}
                        <Button type='submit'>Register</Button>
                        <Row>
                            <Text>Don't have an account?</Text>
                            <LoginLink to={'/login'}>Login</LoginLink>
                        </Row>
                    </Form>
                </Wrapper>
            </Container>
        </div>
    )
}
