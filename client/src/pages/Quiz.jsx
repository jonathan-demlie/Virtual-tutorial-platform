import { Button, Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

import { changeScore, reset } from '../features/quizSlice'
import { useLocation, useNavigate } from 'react-router-dom'
const Done = styled(DoneIcon)`
display:none;
`
const Close = styled(CloseIcon)`
display:none;
`
const Spacer = styled.div`
height:20px;
`
const Title = styled.h1`
font-size:25px;
padding-bottom:10px;
`
const Desc = styled.p`
font-size:19px;
`
const Question = styled.h6`
font-size:17px;
padding-bottom:10px;
`
const Row = styled.div`
display:flex;
justify-content:space-between;
`
const B1 = styled(Button)`
background-color:${props => props.success}
`

const Result = styled.div`
padding:30px;
`
const ResultTitle = styled.p`
font-size:50px;
font-weight:500;
`
const Score = styled.p`
font-size:40px;
font-weight:400;
`
export default function ({ id }) {
    const { user } = useSelector((state) => state.auth)
    const [quiz, setQuiz] = useState()
    const location = useLocation();
    const uuid = location.pathname.split('/')[2];
    useEffect(async () => {
        const res = await axios.get(`http://localhost:5000/api/quiz/${uuid}`)
        if (res.status === 200) {
            setQuiz(res.data.data);
        }
    }, [])
    console.log(quiz)

    // const [success, setSuccess] = useState(false)
    const [wrong1, setWrong1] = useState(false)
    const [wrong2, setWrong2] = useState(false)
    const [wrong3, setWrong3] = useState(false)
    const [wrong4, setWrong4] = useState(false)
    const [currentIndex, setCurrentIndex] = useState()

    const { score } = useSelector((state) => state.quiz)
    const dispatch = useDispatch()
    const [highest,setHighest]=useState(null)

    const choose1 = async (e, index, ans) => {
        e.preventDefault()
        setCurrentIndex(index)
        setHighest(index)
        setWrong1(false)
        setWrong2(false)
        setWrong3(false)
        setWrong4(false)
        if (ans) {
            dispatch(changeScore())
        }else{
            setWrong1(true)
        }
        console.log(index, ans, score)
    }
    const choose2 = async (e, index, ans) => {
        e.preventDefault()
        setCurrentIndex(index)
        setHighest(index)
        setWrong1(false)
        setWrong2(false)
        setWrong3(false)
        setWrong4(false)
        if (ans) {
            dispatch(changeScore())
        }else{
            setWrong2(true)
        }
        console.log(index, ans, score)
    }
    const choose3 = async (e, index, ans) => {
        e.preventDefault()
        setCurrentIndex(index)
        setHighest(index)
        setWrong1(false)
        setWrong2(false)
        setWrong3(false)
        setWrong4(false)
        if (ans) {
            dispatch(changeScore())
        }else{
            setWrong3(true)
        }
        console.log(index, ans, score)
    }
    const choose4 = async (e, index, ans) => {
        e.preventDefault()
        setCurrentIndex(index)
        setHighest(index)
        setWrong1(false)
        setWrong2(false)
        setWrong3(false)
        setWrong4(false)
        if (ans) {
            dispatch(changeScore())
        }else{
            setWrong4(true)
        }
        console.log(index, ans, score)
    }
    const navigate=useNavigate()
    const leave=()=>{
        navigate('/')
    }

    return (
        <div style={{ backgroundColor: "rgb(250, 250, 255)" }}>
            <Navbar />
            <Spacer />
            {quiz ?
                <Grid container spacing={2}>
                    <Grid item lg={3} sm={12}>
                        <Result>
                            <ResultTitle>Score</ResultTitle>
                            <Spacer/>
                            <Score>
                                    {score && score}/{quiz&&quiz.questions&&quiz.questions.length}</Score>
                        </Result>
                    </Grid>
                    <Grid item lg={8} sm={12}>
                        <Title>{quiz.title}</Title>
                        <Desc>{quiz.desc}</Desc>
                        <Spacer />
                        {
                            quiz.questions ? quiz.questions.map((question, index) => (
                                <>   <Question key={index}>{index + 1 + ". "}  {question.question}</Question>
                                    {question.choices &&
                                        <Box sx={{ width: '100%', padding: "20px" }}>
                                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                <Grid item xs={6}>
                                                    <Button  onClick={(e) => choose1(e, index, question.choices[0].answer)} variant='contained'  style={{ pointerEvents:highest&&highest>=index?'none':"",width: "100%", backgroundColor: currentIndex === index ?wrong1? "red":question.choices[0].answer? "green" : "white" : "white", color: "black" }}>
                                                        <Row>
                                                            <>{question.choices[0].choice}
                                                            </>
                                                           
                                                        </Row>
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button onClick={(e) => choose2(e, index, question.choices[1].answer)} variant='contained' style={{pointerEvents:highest&&highest>=index?'none':"", width: "100%", backgroundColor: currentIndex === index ?wrong2? "red":question.choices[1].answer? "green" :"white" : "white", color: "black" }}>
                                                        <Row>
                                                            <>{question.choices[1].choice}</>
                                                           
                                                        </Row>
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button onClick={(e) => choose3(e, index, question.choices[2].answer)} variant='contained' style={{pointerEvents:highest&&highest>=index?'none':"",width: "100%", backgroundColor: currentIndex === index ? wrong3? "red":question.choices[2].answer? "green" : "white" : "white", color: "black" }}>
                                                        <Row>
                                                            <>{question.choices[2].choice}</>
                                                           
                                                        </Row>
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button onClick={(e) => choose4(e, index, question.choices[3].answer)} variant='contained' style={{ pointerEvents:highest&&highest>=index?'none':"",width: "100%", backgroundColor: currentIndex === index ?wrong4? "red":question.choices[3].answer? "green"  : "white" : "white", color: "black" }}>
                                                        <Row>
                                                            <>{question.choices[3].choice}</>
                                                           
                                                        </Row>
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    }
                                </>
                            )) :
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress />
                                </Box>
                        }
                        <Spacer/>
                        <Spacer/>
                        <Button variant='contained' onClick={leave}>Leave Quiz</Button>
                    </Grid>
                    <Grid item lg={1} sm={0}>
                    </Grid>
                </Grid> : <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>}
            <Spacer />
            <Footer />
        </div>
    )
}
