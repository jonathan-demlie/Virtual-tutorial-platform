import { Avatar, Box, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Rating from '@mui/material/Rating';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Title = styled.p`
padding:10px 0;
font-size:20px;
`
const Num = styled.p`
font-size:60px;
`
const Col = styled.div`
display:flex;
flex-direction:column;
`
const Row = styled.div`
padding:20px;
display:flex;
`
const Row2 = styled.div`
padding-top:10px;
display:flex;
`
const Row3 = styled.div`
display:flex;
justify-content:space-between;
`
const P = styled.p`
padding:5px;
`
const Name = styled.h6`
font-size:14px;
padding:10px;
`
const Content = styled.p`
padding-top:5px;
padding-left:7px;
font-size:16px;
`
const Container = styled.div`
padding-top:10px;
dislay:flex;
justify-content:start;
`
const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    pl: 4,
    pr: 4,
    pt: 2,
    pb: 4,
};
const Form = styled.form`
margin-top:10px;
padding-top:20px;
`
const Spacer = styled.div`
height:20px;
`
export default function TutorProfileSidebar({ id }) {
    const [value, setValue] = React.useState(0);
    const [content, setContent] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { user } = useSelector((state) => state.auth)
    const submit = async (e) => {
        e.preventDefault()
        const data = {
            studentId: user.data.id,
            tutorId: id,
            rate: value,
            content,
        }
        const res = await axios.post('http://localhost:5000/api/review', data);
        if (res.status === 201) {
            console.log('success')
        } else {
            console.log("Unsuccess")
        }
    }

    // const [review, setReview] = useState([])
    const [myReview, setMyReview] = useState({})
    const [studentReview, setStudentReview] = useState(null)

    useEffect(async () => {
        const res = await axios.get(`http://localhost:5000/api/review/${id}`);
        if (res.status == 200) {
            setMyReview(res.data.data)
        }
        const response = await axios.get(`http://localhost:5000/api/student/review/${user.data.id}/${id}`)
        if (response.status === 200) {
            setStudentReview(response.data.data)
        }
    }, [])
    let total = 0;
    let review = [];

    for (var i = 0; i < myReview.length; i++) {
        if (myReview[i].tutorId == id) {
            total += myReview[i].rate;
            review.push(myReview[i])
        }

    }
    let totalRate = Math.round((total / review.length) * 10) / 10;
    const newReview = review.slice(0, 3)

    // nav to read all reviews
    const navigate = useNavigate()
    const readAllReviews = () => {
        navigate(`/reviews/${id}`)
    }
    // if(studentReview.length){
    //     console.log("new test")
    // }else{
    //     console.log("njsndfioe")
    // }
    return (
        <div style={{ padding: '0 30px' }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Title>Rate This Tutor</Title>
                        <Col>
                            {studentReview ?
                                <>
                                    <Rating name="half-rating-read" value={studentReview.rate} readOnly />
                                    <Container>
                                        <Button onClick={handleOpen}>Write a review</Button>
                                    </Container>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Row3>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Rate and Review Tutor
                                                </Typography>
                                                <IconButton onClick={handleClose}>
                                                    <ClearIcon />
                                                </IconButton>
                                            </Row3>
                                            <Divider />
                                            <Spacer />
                                            <Rating name="half-rating-read" value={studentReview.rate} readOnly />
                                            <Form>
                                                <TextField value={studentReview.content} fullWidth label="Write a review for this tutor" id="fullWidth" />
                                                <Spacer />
                                                <Button disabled onClick={submit}>Submit</Button>
                                            </Form>
                                        </Box>
                                    </Modal></> : <>
                                    <Rating
                                        name="simple-controlled"
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                    <Container>
                                        <Button onClick={handleOpen}>Write a review</Button>
                                    </Container>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Row3>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Rate and Review Tutor
                                                </Typography>
                                                <IconButton onClick={handleClose}>
                                                    <ClearIcon />
                                                </IconButton>
                                            </Row3>
                                            <Divider />
                                            <Spacer />
                                            <Rating
                                                name="simple-controlled"
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                            />
                                            <Form>
                                                <TextField onChange={(e) => setContent(e.target.value)} fullWidth label="Write a review for this tutor" id="fullWidth" />
                                                <Spacer />
                                                <Button variant='contained' onClick={submit}>Submit</Button>
                                            </Form>
                                        </Box>
                                    </Modal></>
                            }
                        </Col>
                        <Title>Reviews</Title>
                        <Row>
                            <Col>
                                <Num>{totalRate ? totalRate : 0}</Num>
                                <Rating name="half-rating-read" value={totalRate ? totalRate : 0} precision={0.5} readOnly />
                                <Row2>
                                    <PersonOutlineIcon />
                                    <P>{review ? review.length : 0}</P>
                                </Row2>
                            </Col>
                            <Col>
                                <Row>
                                </Row>
                            </Col>
                        </Row>
                        <Col>
                            <>{newReview && newReview.map((rev) => (
                                <Row key={rev.id}>
                                    <Avatar
                                        alt={rev.Student.firstName}
                                        src={rev.Student&& 'http://localhost:5000/' + rev.Student.profile.img}
                                        sx={{
                                            width: 50, height: 50, justifyContent: "center", display: "flex"
                                        }}
                                    >
                                    </Avatar>
                                    <Col>
                                        <Name>{rev.Student&&rev.Student.firstName+" "+rev.Student.lastName}</Name>
                                        <Rating name="half-rating-read" value={rev.rate} size="small" readOnly sx={{
                                            paddingLeft: "7px"
                                        }} />
                                        <Content>
                                            {rev.content}
                                        </Content>
                                    </Col>
                                </Row>
                            ))
                            }</>
                            <Divider />
                            <Button variant='contained' onClick={readAllReviews} sx={{ marginTop: "20px" }}>Read All Reviews</Button>
                        </Col>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}
