import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const Col = styled.div`
display:flex;
flex-direction:column;
padding-top:10px;
`
const Row = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
`

export default function Tutor({ tutor }) {
    const [profile, setProfile] = useState({});
    useEffect(() => {
        setProfile(tutor.profile)
    }, [])
    console.log(profile)
    return (
        <div style={{ padding: "15px" }}>
            <Row>
                <Stack direction="row" spacing={1}>
                    <Avatar
                        alt="Remy Sharp"
                        src={profile ? profile.img ? 'http://localhost:5000/' + profile.img : '' : ''}
                        sx={{ width: 70, height: 70 }}
                    />
                    <Col>
                        <Typography variant="h6">{tutor.firstName} {tutor.lastName}</Typography>
                        <Typography variant='caption'>{profile ? profile.headline : ''}</Typography>
                    </Col>
                </Stack>
                <Typography variant="h6">{profile ? profile.price + ' Birr/Hour' : ''}</Typography>
                <Button component={Link}
                    to={{
                        pathname: `/tutor/${tutor.id}`,
                    }} variant="contained" sx={{ padding: 1 }}>View Profile</Button>
            </Row>

        </div>
    )
}
