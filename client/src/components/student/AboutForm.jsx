import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import {create} from '../../features/about/aboutSlice'

const Form = styled.form`
padding-top:5vh;
width:90%;
display:flex;
flex-direction:column;
margin: 0 auto;
`
const Label = styled.label`
font-size:16px;
`
const TextArea = styled.textarea`
margin-bottom:10px;
border-radius:5px;
width:90%;
&:focus{
  outline:none;
}
`
export default function AboutForm() {
    const { user } = useSelector((state) => state.auth)
    const { about } = useSelector((state) => state.about)
    const [content, setContent] = useState( about? about.data.content : '')
    const dispatch=useDispatch()
    
    const submit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                userId: user.data.id,
                content,
            }
            if (about) {

                // const config = {
                //     headers: {
                //         Authorization: `Bearer ${user.token}`,
                //     },
                // }
                // const response = await axios.put(`http://localhost:5000/api/about/${user.data.id}`, data, config)
                // if(response){
                //     dispatch(show(user.data.id))
                // }
            } else {
                dispatch(create(data))
            }
        } catch (error) {
            console.log("Unsuccessfull!")
        }
    }
    return (
        <div>
            <Form>
                <Label>You can write about your self.</Label>
                <TextArea defaultValue={about?content:''} rows={20} cols={90} onChange={(e) => setContent(e.target.value)}></TextArea>
                <Box textAlign='center' style={{margin:"40px",}}>
                    <Button onClick={submit} variant="contained" style={{ width: '20%', }}>Save</Button>
                </Box>
            </Form>
        </div>
    )
}
