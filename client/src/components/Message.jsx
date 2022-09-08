import { useSelect } from '@mui/base';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import styled from 'styled-components'
import { format } from "timeago.js";
import Avatar from '@mui/material/Avatar';

const Message = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items:${props=>props.own?"flex-end":"flex-start"}
`
const MessageTop = styled.div`
display:flex;
`
const MessageImg = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;
margin-right: 10px;
`
const MessageText=styled.p`
padding: 10px;
border-radius: 20px;
background-color:${props=>props.own?"rgb(245, 241, 241)":"#1877f2"};
color: ${props=>props.own?"black":"white"};
max-width: 300px;
`
const MessageBottom=styled.div`
font-size: 12px;
margin-top: 10px;
`
const Spacer=styled.div`
width:10px;
`

export default function ({own,message}) {
    const {user}=useSelector((state)=>state.auth)
    const [pro,setPro]=useState({})
    useEffect(async()=>{
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            const res=await axios.get(`http://localhost:5000/api/profile/${message.senderId}`,config)
            if(res.status===200){
                console.log(res.data)
                setPro(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    },[])
    return (
        <Message own={own&&own}>
            <MessageTop>
                {!own&&pro&&
                <Avatar src={pro&&`http://localhost:5000/${pro.img}`}  sx={{ width: 50, height: 50 }}/>}
                <Spacer/>
                <MessageText own={own&&own}>{message.text}</MessageText>
                <Spacer/>
                {own&&pro&&
                <Avatar src={pro&&`http://localhost:5000/${pro.img}`}  sx={{ width: 50, height: 50 }}/>}
            </MessageTop>
            <MessageBottom>{format(message.createdAt)}</MessageBottom>
        </Message>
    )
}
