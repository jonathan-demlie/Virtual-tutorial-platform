import { Card, CardContent } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const Wrapper=styled.div`
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items:center;
`
export default function PaymentSuccess() {
  const location = useLocation();
  const id = location.pathname.split('/')[2]
  useEffect(async()=>{
    try {
      const data={
        status:'paid',
      }
      const res=await axios.put(`http://localhost:5000/api/payment/${id}`,data)
      if(res.status===200){
        console.log("success")
      }else{
        console.log("failure")
      }
    } catch (error) {
      
    }
  },[id])
  return (
    <div>
        <Wrapper>
            <Card style={{width:"30%",height:"40%",marginTop:"100px"}}>
                <CardContent style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
                    <CheckCircleOutlineIcon style={{color:"green",width:"100px",height:"100px"}}></CheckCircleOutlineIcon>
                    <h3 style={{color:"green",fontSize:"24px"}}>Payment Completed Successfully</h3>
                    <h6 style={{color:"green",paddingTop:"20px",fontSize:"20px"}}>Thank you</h6>
                </CardContent>
            </Card>
        </Wrapper>
    </div>
  )
}
