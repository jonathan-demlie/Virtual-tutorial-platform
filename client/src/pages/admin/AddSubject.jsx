import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import Card from '@mui/material/Card';
import axios from 'axios';

const Form = styled.form`
display:flex;
flex-direction:column;
padding:40px;
`
const Title = styled.h2`
padding-top:10px;
padding-bottom:20px;
text-align:center;
`
const Label = styled.label`
font-size:18px;
padding-top:10px;
`
const Input = styled.input`
margin:10px 0;
padding:10px 0;
`
const Textarea = styled.textarea`
margin:10px 0;
padding:5px 0;
`
const Spacer = styled.div`
height:20px;
`
const E=styled.sub`
color:red;
display:${props=>props.error1?"flex":"none"};
`
const E2=styled.sub`
color:red;
display:${props=>props.error2?"flex":"none"};
`
const E3=styled.sub`
color:red;
display:${props=>props.error3?"flex":"none"};
`
export default function AddSubject() {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);
    const [error1,setError1]=useState(false)
    const [error2,setError2]=useState(false)
    const [error3,setError3]=useState(false)

    const submit = async(e) => {
        if(name===""){
            setError1(true)
        }
        if(desc===""){
            setError2(true)
        }
        if(!selectedFile){
            setError3(true)
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("desc", desc);
        formData.append("img", selectedFile);

        const res=await axios.post('http://localhost:5000/api/subject',formData)
        if(res.status===201){
            console.log('success')
        }else{
            console.log("unsuccessfull")
        }
        
    }
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item lg={3} sm={1}>
                </Grid>
                <Grid item lg={6} sm={10}>
                    <Card>
                        <Form>
                            <Title>Add Subject</Title>
                            <Label>Subject Name</Label>
                            <Input type='text' onChange={(e) => setName(e.target.value)} />
                            <E error1={error1}>Subject name is empty!</E>
                            <Label>Description</Label>
                            <Textarea onChange={(e) => setDesc(e.target.value)}></Textarea>
                            <E2 error2={error2}>Subject discription is empty!</E2>
                            <Label>Upload Thumbnail</Label>
                            <Input type='file' onChange={(e) => setSelectedFile(e.target.files[0])} />
                            <E3 error3={error3}>Select an Image!</E3>
                            <Spacer />
                            <Button variant='contained' onClick={submit}>Save</Button>
                        </Form>
                    </Card>
                </Grid>
                <Grid item lg={3} sm={1}>
                </Grid>
            </Grid>
        </div>
    )
}
