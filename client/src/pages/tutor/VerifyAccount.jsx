import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '@mui/material/Card';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Form = styled.form`
display:flex;
flex-direction:column;
padding:40px;
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
const Title = styled.h4`
padding:20px 0;
text-align:center;
font-size:20px;
`
const Card1 = styled(Card)`
display:${props => props.verified ? 'none' : ""}
`
const Card2 = styled(Card)`
display:${props => props.verified ? "" : "none"}
`
const Container = styled.div`
display:flex;
align-items:center;
justify-content:center;
`
const Badge = styled(CheckCircleIcon)`
color:rgb(32,129,229);
font-size:100px;
`
export default function () {
    const { user } = useSelector((state) => state.auth)
    const { profile } = useSelector((state) => state.profile)
    const [desc, setDesc] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);
    const [verified, setVerified] = useState(false)

    useEffect(() => {
        if (profile && profile.data.verify) {
            console.log(profile.data.verify)
            setVerified(true)
        }
    }, [])

    const navigate = useNavigate()
    const submit = async (e) => {
        const formData = new FormData();
        formData.append("userId", user.data.id)
        formData.append("desc", desc);
        formData.append("pdf", selectedFile);
        const res = await axios.post('http://localhost:5000/api/verify', formData)
        if (res.status === 201) {
            toast.success("Document uploaded successfully!")
            navigate('/tutor/dashboard')
        } else {
            toast.error("Error occured while uploading the file!")

        }

    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item lg={3} sm={1}>
                </Grid>
                <Grid item lg={6} sm={10}>
                    <Card1 verified={verified}>
                        <Title>Upload File to verify your account</Title>
                        <Form>
                            <Label>Description</Label>
                            <Textarea onChange={(e) => setDesc(e.target.value)} rows={10}></Textarea>
                            <Label>Upload File(only PDF file)</Label>
                            <Input type='file' onChange={(e) => setSelectedFile(e.target.files[0])} />
                            <Spacer />
                            <Button variant='contained' onClick={submit}>Save</Button>
                        </Form>
                    </Card1>
                    <Card2 verified={verified}>
                        <Title>Your Profile is Verified</Title>
                        <Spacer />
                        <Container>
                            <Badge />
                        </Container>
                        <Spacer/>
                        <Spacer/>
                    </Card2>
                </Grid>
                <Grid item lg={3} sm={1}>
                </Grid>
            </Grid>
        </div>
    )
}
