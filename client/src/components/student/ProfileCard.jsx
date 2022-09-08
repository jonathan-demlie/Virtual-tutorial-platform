import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch, useEffect } from 'react-redux';
import Modal from '@mui/material/Modal';
import { Avatar, Divider, Stack } from '@mui/material';
import ImageAvatar from '../ImageAvatar';
import ProfileForm from './ProfileForm';
import { show, create } from '../../features/profile/profileSlice'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

const Row3 = styled.div`
display:flex;
justify-content:space-between;
`


const style = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};
const titleStyle = {
    pl: 5,
    pr: 5,
    pt: 2,
    fontSize: 20,
    fontWeight: 600,
};
const Input = styled.input`
    display: none;
`
const Label = styled.label`
`

export default function ProfileCard() {
    const { user } = useSelector((state) => state.auth)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedFile, setSelectedFile] = useState();

    const dispatch = useDispatch()
    React.useEffect(async () => {
        dispatch(show(user.data.id));
    }, []);
    const { profile } = useSelector((state) => state.profile)

    const uploadPro = async (event) => {
        setSelectedFile(event.target.files[0]);
        const formData = new FormData();
        formData.append('img', selectedFile);
        console.log(selectedFile)
        // dispatch(updateProfile(user.data.id,formData))
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        }
        const res = await axios.put(`http://localhost:5000/api/profile-image/${user.data.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data'}
        });
        if (res) {
            console.log(res)
            dispatch(show(user.data.id))
        }
    };
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Box
                            sx={{
                                width: '100%',
                                height: 300,
                                backgroundColor: '#959e97',
                                justifyContent: "center",
                                alignItems: 'center',
                                display: "flex"
                            }}
                        >
                            <Stack>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={profile ? profile.data.img ? 'http://localhost:5000/' + profile.data.img : '' : ''}
                                    sx={{
                                        width: 150, height: 150, justifyContent: "center", display: "flex"
                                    }}
                                >
                                </Avatar>
                                <Input type="file" onChange={uploadPro} id="contained-button-file" />
                                <Label htmlFor="contained-button-file">
                                    <CameraAltIcon style={{ color: "blue" }} />
                                </Label>
                            </Stack>
                        </Box>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, lg: 4 }}>
                            <Grid item lg={10}>
                                <Typography sx={{ fontSize: 18, fontWeight: 600, paddingTop: 2 }} color="text.primary" gutterBottom>
                                    {user.data.firstName} {user.data.lastName}
                                </Typography>
                            </Grid>
                            <Grid item lg={2}>
                                <IconButton onClick={handleOpen}>
                                    {profile ?
                                        < EditIcon /> : < AddIcon />}
                                </IconButton>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>

                                        <Row3>
                                            <Typography sx={titleStyle} id="modal-modal-title" variant="h6" component="h2">
                                                {profile ? "Update Profile" : "Create Profile"}
                                            </Typography>
                                            <IconButton onClick={handleClose}>
                                                <ClearIcon />
                                            </IconButton>
                                        </Row3>
                                        <Divider />
                                        <ProfileForm />
                                    </Box>
                                </Modal>
                            </Grid>
                        </Grid>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, lg: 4 }}>
                            <Grid item lg={9}>
                                <Typography variant="body2">
                                    {profile ? profile.data.gradeLevel : "Your Grade Level here"}
                                    <br />
                                    {profile ? profile.data.address : "your address"}
                                    <br />
                                    {profile ? profile.data.phone : "your phone"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </Box>
    );
}