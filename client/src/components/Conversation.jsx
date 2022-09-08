import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Conv = styled.div`
display: flex;
align-items: center;
padding: 10px;
cursor: pointer;
margin-top: 20px;
&hover:{
  background-color: rgb(245, 243, 243);
}
`
const ConvImg = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
margin-right: 20px;
`
const ConvName = styled.span`
font-weight: 500;
`
export default function Conversation({ conversation, currentUser }) {
    const friendId = conversation.senderId === currentUser.id?conversation.recieverId:conversation.senderId;
    console.log(currentUser.id)
    const [user,setUser]=useState(null)
    useEffect(() => {
        const getUser = async () => {
          try {
            const res = await axios("http://localhost:5000/api/user/" + friendId);
            setUser(res.data.data);
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, [currentUser, conversation]);
    return (
        <Conv className="conversation">
            <ConvImg
                className="conversationImg"
                src={
                    user&&'http://localhost:5000/'+user.profile.img
                }
                alt=""
            />
            <ConvName className="conversationName">{user&&user.firstName +" "+ user.lastName}</ConvName>
        </Conv>
    )
}
