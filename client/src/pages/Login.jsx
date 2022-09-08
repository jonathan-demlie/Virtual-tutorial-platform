import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
height:60vh;
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
padding-top:5vh;
width:25vw;
display:flex;
flex-direction:column;
margin: 0 auto;
`
const Input = styled.input`
margin-top:15px;
padding:10px;
height:30px;
border-color:black;
border-radius:5px;
font-size:16px;
::placeholder {
    color: black;
    font-size: 1.5em;
  }
&:focus{
    outline:none;
}  
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
const RegisterLink = styled(Link)`
padding-left:10px;
color:#2169de;
font-size:20px;
font-weight:400;
text-decoration:none;
&:hover{
    color:blue;
}
`
const Error = styled.p`
font-size:13px;
color:red;
display:none}
`
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError,setEmailError]=useState(false)
    const [passwordError,setPasswordError]=useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            if (user.data.role === 'student') {
                navigate('/student/dashboard')
            } else if (user.data.role === 'tutor') {
                navigate('/tutor/dashboard')
            }else if(user.data.role==='admin'){
                navigate('/admin/dashboard')
            }
        }
        dispatch(reset())
    }, [user, isError, isLoading, isSuccess, message, dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                email,
                password
            }
            if(password===''){
                setPasswordError(true)
            }
            if(email==''){
                setEmailError(true)
            }
            if(emailError||passwordError){
                
            }else{
                dispatch(login(userData))
            }
        } catch (error) {
            console.log("login unsuccessfull!")
        }
    }
    return (
        <div>
            <Container>
                <Wrapper>
                    <Title>LOGIN</Title>
                    <Form onSubmit={handleSubmit}>
                        <Input type={"email"} placeholder={"E-mail"} onChange={e =>  [setEmail(e.target.value),setEmailError(false)] }></Input>
                        {emailError&&<sub style={{color:"red"}}>Email field is Empty!</sub>}
                        <Input type={"password"} placeholder={"Password"} onChange={e => [setPassword(e.target.value),setPasswordError(false) ]}></Input>
                        {passwordError&&<sub style={{color:"red"}}>Password field is empty</sub>}
                        <Button type='submit'>Login</Button>
                        <Row>
                            <Text>Don't have an account?</Text>
                            <RegisterLink to={'/register'}>Register</RegisterLink>
                        </Row>
                    </Form>
                </Wrapper>
            </Container>
        </div>
    )
}
