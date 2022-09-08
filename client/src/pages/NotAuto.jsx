import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const Number = styled.p`
font-size:150px;
text-align:center;
padding-top:10vh;
font-weight:800;
font-family: "Times New Roman", Times, serif;
`
const Title = styled.p`
font-size:80px;
text-align:center;
padding-top:30px;
font-weight:600;
font-family: "Times New Roman", Times, serif;
`
const Content = styled.p`
font-size:20px;
text-align:center;
padding-top:30px;
font-family:"Times New Roman", Times, serif;
`
export default function NotAuto() {
    return (
        <div style={{ backgroundColor: "rgb(230, 245, 255)", height: '100vh' }}>
            <Number>401</Number>
            <Title>ACCESS DENIED</Title>
            <Content>You are not authorized to access this page.
                <a href='/home' style={{textDecoration:'none'}}>Back To Home</a></Content>
        </div>
    )
}
