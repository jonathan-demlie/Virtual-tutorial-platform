import { Card, CardContent } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper=styled.div`
display:flex;
justify-content:center;
padding-top:100px;
width:100%;
`
const Title=styled.h4`
padding:20px 0;
font-size:25px;
text-align:center;
`
const Content=styled.p`
padding:0 20px
font-size:19px;
text-align:center;
`
const Label=styled.p`
font-size:22px;
padding-left:40px;
padding-top:30px;
`
const Input=styled.input`
width:90%;
padding:10px 0;
border-radius:5px;
margin-left:40px;
`


const Row=styled.div`
display:flex;
margin:40px 40px;
justify-content:space-between;
align-items:center;
`
const Button=styled.button`
height:40px;
width:200px;
padding:10px;
background-color:rgb(32,129,229);
border:none;
border-radius:10px;
&:hover{
    background-color:rgb(32,100,255);
    cursor:pointer;
}
`
const NewLink=styled(Link)`
text-decoration:none;
color:black;
&:hover{
    color:rgb(32,129,229);
}
`
const Divider=styled.div`
width:1px;
height:40px;
color:black;
background-color:black;
`
export default function ForgotPassword() {
  return (
    <div style={{backgroundColor:"rgb(230, 245, 255)",height:"100vh"}}>
        <Wrapper>
            <Card sx={{width:"35%"}}>
                <CardContent sx={{width:"90%"}}>
                    <Title>Trouble logging In?</Title>
                    <Content>Enter your email and we will send you a link to go back in to your account.</Content>
                    <Label>E-mail</Label>
                    <Input/>
                   <Row>
                    <Button>Reset Password</Button>
                    <Divider/>
                    <NewLink to='/register'>Create an account</NewLink>
                    </Row> 
                </CardContent>
            </Card>
        </Wrapper>
    </div>
  )
}
