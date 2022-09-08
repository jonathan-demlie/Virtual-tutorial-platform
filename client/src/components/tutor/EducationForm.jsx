import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { create, update,show } from '../../features/education/educationSlice'
import axios from 'axios';
const Row = styled.div`
padding-bottom:10px;
display:flex;
justify-content:space-between;
`
const Col = styled.div`
display:flex;
flex-direction:column;
`
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
const Input = styled.input`
margin-bottom:10px;
padding:5px;
height:30px;
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
const DPicker = styled(DatePicker)`
margin-bottom:10px;
padding:5px;
height:30px;
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
const Error=styled.sub`
color:red;
`
export default function EducationForm() {
    const { user } = useSelector((state) => state.auth)
    const { education } = useSelector((state) => state.education)

    const [school, setSchool] = useState(education ? education.data.school : '')
    const [field, setField] = useState(education ? education.data.field : '')
    const [grade, setGrade] = useState(education ? education.data.grade : null)
    const [desc, setDesc] = useState(education ? education.data.desc : '')
    const [start, setStart] = useState(education ? new Date(education.data.start) : new Date());
    const [end, setEnd] = useState(education ? new Date(education.data.end) : new Date());

    const [schoolError,setSchoolError]=useState(false)
    const [fieldError,setFieldError]=useState(false)

    const dispatch = useDispatch()
    const submit = async (e) => {
        e.preventDefault();
        setSchoolError(false)
        setFieldError(false)

        try {
            const data = {
                userId: user.data.id,
                school,
                field,
                start,
                end,
                grade,
                desc
            }
            if(school===''){
                setSchoolError(true)
            }if(field===''){
                setFieldError(true)
            }
            if(schoolError||fieldError){
            }else if (education) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
                const response = await axios.put(`http://localhost:5000/api/education/${user.data.id}`, data, config)
                if(response){
                    dispatch(show(user.data.id))
                }
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
                <Label>School</Label>
                <Input defaultValue={education ? education.data.school : ''} onChange={(e) => setSchool(e.target.value)}></Input>
                <Error style={{display:schoolError?`flex`:"none"}}>School field is empty</Error>
                <Label>Field of Study</Label>
                <Input defaultValue={education ? education.data.field : ''} onChange={(e) => setField(e.target.value)}></Input>
                <Error style={{display:fieldError?`flex`:"none"}}>Field of study is empty</Error>
                <Row>
                    <Col>
                        <Label>Start date</Label>
                        <DPicker selected={start} onChange={(date) => setStart(date)} />
                    </Col>
                    <Col>
                        <Label>End date</Label>
                        <DPicker selected={end} onChange={(date) => setEnd(date)} />
                    </Col>
                </Row>
                <Label>Grade(optional)</Label>
                <Input defaultValue={education ? education.data.grade : ''} onChange={(e) => setGrade(e.target.value)}></Input>                
                <Label>Description</Label>
                <Input defaultValue={education ? education.data.desc : ''} onChange={(e) => setDesc(e.target.value)}></Input>
                <Box textAlign='center' style={{ margin: "40px", }}>
                    <Button onClick={submit} variant="contained" style={{ width: '20%', }}>Save</Button>
                </Box>
            </Form>

        </div>
    )
}
