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
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import { Divider } from '@mui/material';
import AboutForm from './AboutForm';
import { useEffect } from 'react';
import { show } from '../../features/about/aboutSlice';
import ClearIcon from '@mui/icons-material/Clear';
import styled from 'styled-components';

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

export default function AboutCard() {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    React.useEffect(async () => {
        dispatch(show(user.data.id));
    }, []);
    const { about } = useSelector((state) => state.about)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, lg: 4 }}>
                            <Grid item lg={10}>
                                <Typography sx={{ fontSize: 18, fontWeight: 600, paddingTop: 2 }} color="text.primary" gutterBottom>
                                    About
                                </Typography>
                            </Grid>
                            <Grid item lg={2}>
                                <IconButton onClick={handleOpen}>
                                    {about ?
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
                                                {about ? "Update About Yourself" : "Post About Yourself"}
                                            </Typography>
                                            <IconButton onClick={handleClose}>
                                                <ClearIcon />
                                            </IconButton>
                                        </Row3>

                                        <Divider />
                                        <AboutForm />
                                    </Box>
                                </Modal>
                            </Grid>
                        </Grid>
                        <Typography sx={{ fontSize: 17, paddingTop: 2 }} color="text.primary" gutterBottom>
                            {about ? about.data.content : 'Write about yourself'}
                        </Typography>
                    </CardContent>
                </React.Fragment>
            </Card>
        </Box>)
}
