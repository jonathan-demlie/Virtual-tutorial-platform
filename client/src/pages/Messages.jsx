import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import Message from '../components/Message'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Conversation from '../components/Conversation'
import { io } from "socket.io-client";
import socketClient from "socket.io-client";

const Messenger = styled.div`
padding-bottom:20px;
padding-right:50px;
padding-left:50px;
height: calc(100vh - 70px);
display: flex;
`
const ChatMenu = styled.div`
flex: 3.5;
`
const ChatMenuInput = styled.input`
width: 90%;
padding: 10px 0;
border: none;
border-bottom: 1px solid gray;
`
const ChatBox = styled.div`
flex: 5.5;
`
const ChatMenuWrapper = styled.div`
padding: 10px;
  height: 100%;
`
const ChatBoxWrapper = styled.div`
padding: 10px;
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
position: relative;
`
const ChatBoxTop = styled.div`
height: 100%;
overflow-y: scroll;
padding-right: 10px;
`
const ChatBoxBottom = styled.div`
margin-top: 5px;
display: flex;
align-items: center;
`
const ChatMessageInput = styled.input`
width: 80%;
height: 40px;
padding: 10px;
`
const ChatSubmitButton = styled.button`
width: 70px;
height: 40px;
border: none;
cursor: pointer;
background-color: teal;
color: white;
`
const NoConversationText = styled.span`
position: absolute;
top: 10%;
font-size: 50px;
color: rgb(224, 220, 220);
cursor: default;
`
const NameDiv = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:100%;
height:50px;
background-color:rgb(32,129,229);
`
const Name = styled.p`
font-size:20px;
color:white;
`
export default function Messages() {
  const scrollRef = useRef();
  const { user } = useSelector((state) => state.auth)
  const [currentChat, setCurrentChat] = useState(null)
  const [text, setText] = useState('')
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentReciever,setCurrentReciever]=useState({})

  const socket = useRef();


  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    // var so = socketClient('http://127.0.0.1:5000');
    // so.on('connection', () => {
    //   console.log(`I'm connected with the back-end`);
    // });
    // socket.current = so;
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      console.log("arr" + arrivalMessage)
    });
    console.log(arrivalMessage)
  }, []);

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/api/message/${currentChat && currentChat.id}`)
    arrivalMessage &&
      Object.values(currentChat).includes(arrivalMessage.senderId) && setMessages(res.data.data);
    //  (prev)=>[...prev,arrivalMessage]
    console.log("arrival mess" + arrivalMessage)
    console.log('current')
    console.log(currentChat)
  }, [arrivalMessage, currentChat]);

  useEffect( async()=>{
    const recieverId = currentChat.senderId === user.data.id ? currentChat.recieverId : currentChat.senderId
    const res=await axios.get(`http://localhost:5000/api/user/${recieverId}`)
    setCurrentReciever(res.data.data)
  },[currentChat])

  useEffect(() => {
    console.log('current user Id' + user.data.id)
    socket.current.emit("addUser", user.data.id);
  }, [user]);


  useEffect(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/conversation/${user.data.id}`)
      if (res.status === 200) {
        console.log(res.data.data)
        setConversations(res.data.data)
      } else {
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/message/${currentChat && currentChat.id}`)
      if (res.status === 200) {
        // console.log(res.data.data)
        setMessages(res.data.data)
      } else {
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }, [currentChat])
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        senderId: user.data.id,
        conversationId: currentChat.id,
        text,
      }
      const recieverId = currentChat.senderId === user.data.id ? currentChat.recieverId : currentChat.senderId
      console.log("sender and recieverID" + user.data.id + recieverId)
      socket.current.emit("sendMessage", {
        senderId: user.data.id,
        recieverId,
        text,
      });

      const res = await axios.post('http://localhost:5000/api/message', data)
      if (res.status === 201) {
        setMessages([...messages, res.data.data]);
        setText("")
      } else {
        console.log("wrong")
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div>
      <Messenger>
        <ChatMenu>
          <ChatMenuWrapper>
            <h2>Chats</h2>
            {
              conversations ? conversations.map((conversation, index) => (
                <div key={index} onClick={() => setCurrentChat(conversation)}>
                  <Conversation conversation={conversation} currentUser={user.data} />
                </div>
              )) : <p>No conversation yet</p>
            }

          </ChatMenuWrapper>
        </ChatMenu>
        <ChatBox>
          <ChatBoxWrapper>

            {currentChat ? (
              <>
                <div style={{ height: '20px' }}></div>
                <NameDiv><Name>{currentReciever&&currentReciever.firstName+" "+currentReciever.lastName}</Name></NameDiv>
                <ChatBoxTop>
                  {messages && messages.map((message) => (
                    <div ref={scrollRef}>
                      <Message message={message} own={message.senderId === user.data.id ? true : false} />
                    </div>
                  ))}
                </ChatBoxTop>
                <div style={{ height: '20px' }}></div>
                <ChatBoxBottom>
                  <ChatMessageInput
                    placeholder="write your message..."
                    onChange={(e) => setText(e.target.value)}
                  ></ChatMessageInput>
                  <ChatSubmitButton onClick={onSubmit}>
                    Send
                  </ChatSubmitButton>
                </ChatBoxBottom>
              </>
            ) : <NoConversationText>
              Select a user to start a chat.
            </NoConversationText>}
          </ChatBoxWrapper>
        </ChatBox>
      </Messenger>
    </div>
  )
}
