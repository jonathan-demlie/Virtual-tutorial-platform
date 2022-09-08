import { Box, Button, Card, CardContent, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';


const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
};

const titleStyle = {
    pl: 5,
    pr: 5,
    pt: 2,
    fontSize: 20,
    fontWeight: 600,
};
const Row3 = styled.div`
display:flex;
justify-content:space-between;
`
const Title = styled.h2`
padding:15px 0px;
text-align:center;
padding-bottom:40px;
`
const Name = styled.p`
font-size:20px;
`
const Row = styled.div`
margin:40px 100px;
display:flex;
justify-content:space-between;
`
const Col = styled.div`
width:45%;
display:flex;
flex-direction:column;
`
const Divider = styled.div`
height:1px;
width:100%;
margin:30px 0;
background-color:rgba(0,0,0,0.6);
`
const Row2 = styled.div`
padding-bottom:10px;
display:flex;
`
export default function Checkout() {
    const merchentId = 7756;
    const [schedule, setSchedule] = useState(null)
    const [pricePerMin, setPricePerMin] = useState(null)
    const [totalMin, setTotalMin] = useState(null)
    const [totalPrice, setTotalPrice] = useState(1)
    const { user } = useSelector((state) => state.auth)
    const location = useLocation()
    const id = location.pathname.split('/')[2]


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(async () => {
        const res = await axios.get(`http://localhost:5000/api/schedule/${id}`);
        if (res.status == 200) {
            setSchedule(res.data.data[0])
            console.log(schedule)
        }
    }, [])

    useEffect(() => {

    }, [open])

    useEffect(() => {
        schedule && schedule.TutorId && schedule.TutorId.profile && setPricePerMin(schedule.TutorId.profile.price / 60)
        schedule && setTotalMin(Math.round((new Date(schedule.endDate) - new Date(schedule.startDate)) / 60000))
    }, [schedule])

    useEffect(() => {
        // setTotalPrice(pricePerMin * totalMin)
    }, [totalMin, pricePerMin])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            totalAmount: totalPrice,
            senderId: user.data.id,
            scheduleId: schedule && schedule.id,
            recieverId: schedule.TutorId && schedule.TutorId.id
        }
        const res = await axios.post('http://localhost:5000/api/payment', data)
        if (res) {
            console.log("success")
        } else {
            console.log("failure")
        }
        setOpen(true)
    }
    const ipn = 'http://localhost:5000/api/verify/ipn'
    const successUrl = `http://localhost:3000/payment-success/${schedule&&schedule.id}`
    return (
        <div>
            <Navbar />
            <Grid sx={{ padding: "30px" }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid lg={3} sm={1} md={2}>
                </Grid>
                <Grid lg={6} sm={10} md={8}>
                    <Card>
                        <CardContent>
                            <Title>Checkout</Title>
                            {schedule && schedule.TutorId && schedule.TutorId.profile &&
                                <>
                                    <Row2>
                                        <h4>Schedule Title: </h4>
                                        <p>{" " + schedule.title}</p>
                                    </Row2>
                                    <Row2>
                                        <h4>Tutor Name: </h4>
                                        <p>{" " + schedule.TutorId.firstName + " " + schedule.TutorId.lastName}</p>
                                    </Row2>
                                    <Divider></Divider>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">Total Minutes</TableCell>
                                                    <TableCell align="left">Price Per Minute</TableCell>
                                                    <TableCell align="left">Total Price</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left">{totalMin}</TableCell>
                                                    <TableCell align="left">{pricePerMin}</TableCell>
                                                    <TableCell align="left">{totalMin + " X " + pricePerMin}</TableCell>
                                                </TableRow>

                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left"></TableCell>
                                                    <TableCell align="left"></TableCell>
                                                    <TableCell align="left">{totalPrice && totalPrice + " Birr"}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Box textAlign='center'>
                                        <Button onClick={handleSubmit} sx={{ marginTop: "40px", width: "40%", alignSelf: "center" }} variant='contained'>Checkout</Button>
                                    </Box>

                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Row3>
                                                <Typography sx={titleStyle} id="modal-modal-title" variant="h6" component="h2">
                                                    Pay with YenePay
                                                </Typography>
                                                <IconButton onClick={handleClose}>
                                                    <ClearIcon />
                                                </IconButton>
                                            </Row3>
                                            <Divider />
                                            <Row>
                                                <h4>Total Price</h4>
                                                <h6>{totalPrice + " Birr"}</h6>
                                            </Row>
                                            <div style={{ marginBottom: "30px", marginLeft: "100px", display: 'flex', alignItems: "center" }}>
                                                <p style={{ fontSize: "25px", paddingRight: "10px" }}>Pay With</p>
                                                <a id="yenepayLogo" href={`https://www.yenepay.com/checkout/Home/Process/?ItemName=tutor&ItemId=${schedule.id}&UnitPrice=${totalPrice && totalPrice}&Quantity=1&Process=Express&ExpiresAfter=&DeliveryFee=&HandlingFee=&Tax1=&Tax2=&Discount=&SuccessUrl=${successUrl}&IPNUrl=${ipn}&MerchantId=${merchentId}`}>
                                                    <img style={{ width: "100px" }} src=" https://yenepayprod.blob.core.windows.net/images/logo.png"></img>
                                                </a>
                                            </div>
                                        </Box>
                                    </Modal>
                                </>
                            }

                        </CardContent>
                    </Card>
                </Grid>
                <Grid lg={3} sm={1} md={2}>
                </Grid>
            </Grid>
        </div>
    )
}
