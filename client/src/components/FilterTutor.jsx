import { Card, CardContent } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useState } from 'react';

const Title = styled.h6`
font-size:20px;
text-align:center;
padding-bottom:30px;
`
const Container = styled.div`
display:flex;
padding:30px;
`
export default function FilterTutor() {
    const [priceAbove,setPriceAbove]=useState(false)
    const [PriceBelow,setPriceBelow]=useState(false)
    const [cgpaAbove,setCgpaAbove]=useState(false)
    const [cgpaBelow,setCgpaBelow]=useState(false)
    console.log(priceAbove,PriceBelow)
    return (
        <div style={{ padding: '50px' }}>
            <Title>Filter Tutors</Title>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox onChange={()=>setPriceAbove(true)}/>} label="price Above 150/hr" />
                            <FormControlLabel control={<Checkbox onChange={()=>setPriceBelow(true)}/>} label="price Below 150/hr" />
                            <FormControlLabel control={<Checkbox onChange={()=>setCgpaAbove(true)}/>} label="CGPA  Above 3.0" />
                            <FormControlLabel control={<Checkbox onChange={()=>setCgpaBelow(true)}/>} label="CGPA  Below 3.0" />
                        </FormGroup>
                        <Container>
                            <Button variant='contained'>Search</Button>
                        </Container>
                    </CardContent>
                </React.Fragment>
            </Card>
        </div>
    )
}
