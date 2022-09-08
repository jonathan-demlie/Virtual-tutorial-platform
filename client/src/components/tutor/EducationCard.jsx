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
import { useSelector, useDispatch } from 'react-redux';
import Modal from '@mui/material/Modal';
import { Divider } from '@mui/material';
import EducationForm from './EducationForm';
import { show } from '../../features/education/educationSlice'
import moment from 'moment'
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

export default function EducationCard() {
    const { user } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.profile)
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({});
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();

    React.useEffect(async () => {
        dispatch(show(user.data.id));
    }, []);
    const { education } = useSelector((state) => state.education)
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, lg: 4 }}>
                            <Grid item lg={10}>
                                <Typography sx={{ fontSize: 18, fontWeight: 600, paddingTop: 2 }} color="text.primary" gutterBottom>
                                    Education
                                </Typography>
                            </Grid>
                            <Grid item lg={2}>
                                <IconButton onClick={handleOpen}>
                                    {education ?
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
                                                {education ? "Update Education" : "Post Education"}
                                            </Typography>
                                            <IconButton onClick={handleClose}>
                                                <ClearIcon />
                                            </IconButton>
                                        </Row3>
                                        <Divider />
                                        <EducationForm />
                                    </Box>
                                </Modal>
                            </Grid>
                        </Grid>
                        <Typography sx={{ fontSize: 17, paddingTop: 2 }} color="text.primary" gutterBottom>
                            {education ? education.data.school : ""}
                        </Typography>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, lg: 4 }}>
                            <Grid item lg={9}>
                                <Typography variant="body2">
                                    {education ? education.data.field : ""}
                                    <br />
                                    {education ? moment(education.data.start).format('YYYY') : ''} - {education ? moment(education.data.end).format('YYYY') : ''}
                                </Typography>
                            </Grid>
                            <Grid item lg={3}>
                                <Typography variant="body2">
                                    {education ? education.data.grade : ''}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </React.Fragment>
            </Card>
        </Box>)
}
