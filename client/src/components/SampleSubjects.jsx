import { Button, Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Title = styled.h2`
padding-bottom:50px;
text-align:center;
`
const Title2 = styled.h5`
padding-top:10px;
text-align:center;
`

const Row = styled.div`
display:flex;
`
const Column = styled.div`
display:flex;
flex-direction:column;
`
const Spacer = styled.div`
height:20px;
`
const Container = styled.div`
padding:20px 30px;
`
// const Button=styled.Button`
// width:10vw;
// height:50px;
// font-size:19px;
// background-color:rgb(32,129,229);
// color:white;
// border-radius:10px;
// border:none;
// `
export default function SampleSubjects() {
    const [subjects, setSubjects] = useState([])

    useEffect(async () => {
        const res = await axios.get('http://localhost:5000/api/subjects');
        if (res.status == 200) {
            setSubjects(res.data.data)
        }
    }, [])
    return (
        <div style={{ backgroundColor: "#ededdd" }}>
            <Grid container spacing={2}>
                <Grid item lg={1} sm={1}>
                </Grid>
                <Grid item lg={10} sm={10}>
                    <Title>Popular Subjects</Title>
                    <Spacer />
                    <Stack direction={{ sm: 'column', lg: 'row' }}
                    >
                        {subjects && subjects.map((subject) => (
                            <Container>
                                <Stack direction="column" spacing={2}>
                                    <Title2>{subject.name}</Title2>
                                    <Avatar src={subject && subject.img} sx={{ width: 120, height: 120 }}></Avatar>
                                </Stack>
                            </Container>
                        ))}
                    </Stack>
                    <Spacer />
                    <Spacer />
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <Button variant='contained'>See More Subjects</Button>
                    </div>
                    <Spacer />
                    <Spacer />
                </Grid>
                <Grid item lg={1} sm={1}>
                </Grid>
            </Grid>
        </div>
    )
}
