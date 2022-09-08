import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
height:60vh;
width:100vw;
display:flex;
background-color:#ededdd;
`
const TextContainer = styled.div`
flex:1;
margin-top:10vh;
margin-left:10vw;
display:flex;
flex-direction:column;
`
const SearchWrapper=styled.div`
padding-top:50px;
display:flex;
`
const SearchInput=styled.input`
margin-top:10px;
padding:10px;
height:30px;
font-size:16px;
::placeholder {
    color: black;
    font-size: 1em;
  }
&:focus{
    outline:none;
} 
`
const SearchButton=styled.button`
background-color:rgb(32,129,229);
color:white;
border:none;
margin-top:10px;
height:54px;
width:100px;
font-size:17px;
border-top-right-radius: 5px;
border-bottom-right-radius: 5px;
&:hover{
    cursor:pointer;
}
`

const ImgContainer = styled.div`
flex:1;
margin-top:10vh;
margin-left:10vw;
margin-right:10vw;
`
const ImgWrapper=styled.div`
background-color:rgb(32,129,229);
height:40vh;
width:30vw;
display: flex;
align-items: center;
justify-content: center;
border-radius:25px;
transform: rotate(-5deg);
`
const Img=styled.img`
height:35vh;
width:27vw;
border-radius:20px;
`
const Title = styled.h1`
font-size:50px;
font-weight:800;
letter-spacing:2px;
font-family: Arial Narrow, sans-serif;
`


export default function Welcome() {
    const navigate=useNavigate()
    const handleSearch=()=>{
        navigate('/tutors')
    }
    return (
        <div>
            <Wrapper>
                <TextContainer>
                    <Title>Whatever your learning goals may be,find Tutors at anytime from anywhere.</Title>
                    <SearchWrapper>
                        <SearchInput placeholder='Search a subject'></SearchInput>
                        <SearchButton onClick={handleSearch}>Find Tutor</SearchButton>
                    </SearchWrapper>
                </TextContainer>
                <ImgContainer>
                <ImgWrapper>
                <Img src='https://thumbs.dreamstime.com/b/online-tutoring-male-african-teacher-headset-having-web-lesson-laptop-online-tutoring-male-african-teacher-headset-207946628.jpg'></Img>
                </ImgWrapper>
                </ImgContainer>
            </Wrapper>
        </div>
    )
}
