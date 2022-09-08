import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Tutor from './Tutor';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

const Title = styled.h5`
text-align:center;
font-size:25px;
padding-top:30px;
padding-bottom:20px;
`
const Container = styled.div`
display:flex;
justify-content:center;
padding:30px 0;
`
export default function SampleTutors() {
    const [tutors, setTutors] = useState([])

    useEffect(async () => {
        const res = await axios.get('http://localhost:5000/api/home-tutors');
        if (res.status == 200) {
            setTutors(res.data.data)
        }
    }, [])
    const navigate = useNavigate()
    const NavToTutors = () => {
        navigate('/tutors')
    }
    return (
        <div>
            <Title>Our Tutors</Title>
            <Grid container spacing={2}>
                <Grid item lg={3}>

                </Grid>
                <Grid item lg={6}>
                    <>
                        {
                            tutors.map((tutor) => (
                                <Tutor key={tutor.id} tutor={tutor} />
                            ))
                        }
                    </>
                    <Container>
                        <Button variant="contained" onClick={NavToTutors}>Find More Tutors</Button>
                    </Container>
                </Grid>
                <Grid item lg={3}>
                </Grid>
            </Grid>
        </div>
    )
}
