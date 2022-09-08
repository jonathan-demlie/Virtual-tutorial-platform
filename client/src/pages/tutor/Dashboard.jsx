import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageIcon from '@mui/icons-material/Message';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'
import MyProfile from '../../components/tutor/MyProfile';
import CreateQuiz from './CreateQuiz';
import Schedules from './Schedules';
import Messages from '../Messages';
import GroupIcon from '@mui/icons-material/Group';
import Students from './Students';
import Review from './Review';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AddIcon from '@mui/icons-material/Add';

import { logout, reset } from '../../features/auth/authSlice'
import { reset as eduReset} from '../../features/education/educationSlice'
import { reset as proReset } from '../../features/profile/profileSlice'
import { reset as aboutReset} from '../../features/about/aboutSlice'
import { useDispatch } from 'react-redux';
import Quizes from './Quizes';
import DoneIcon from '@mui/icons-material/Done';
import VerifyAccount from './VerifyAccount';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Payments from './Payments';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedDash, setSelectedDash] = React.useState('profile')

  const dispatch = useDispatch()

  const navigate = useNavigate();
  const navToHome = () => {
    navigate('/')
  }
  const changeSelected = (name) => {
    setSelectedDash(name);
    console.log(selectedDash);
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
   
  const navToRoom=(e)=>{
    navigate('/room')
  }
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    dispatch(eduReset())
    dispatch(proReset())
    dispatch(aboutReset())
    navigate('/')
  }
  return (
    <div >
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Tutor Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem button onClick={navToHome}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
            <ListItem button onClick={() => changeSelected('profile')}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
            <ListItem button onClick={() => changeSelected('schedules')}>
              <ListItemIcon><EventNoteIcon /></ListItemIcon>
              <ListItemText>Schedules</ListItemText>
            </ListItem>
            <ListItem button onClick={navToRoom}>
              <ListItemIcon><VideoCallIcon /></ListItemIcon>
              <ListItemText>Room</ListItemText>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={() => changeSelected('messages')}>
              <ListItemIcon><MessageIcon /></ListItemIcon>
              <ListItemText>Messages</ListItemText>
            </ListItem>
            <ListItem button onClick={() => changeSelected('quizes')}>
              <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
              <ListItemText>Quizes</ListItemText>
            </ListItem>
            <ListItem button onClick={() => changeSelected('create')}>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText>Create Quiz</ListItemText>
            </ListItem>
            <ListItem button onClick={() => changeSelected('review')}>
              <ListItemIcon><RateReviewIcon /></ListItemIcon>
              <ListItemText>Review</ListItemText>
            </ListItem>
            <ListItem button onClick={() => changeSelected('verify')}>
              <ListItemIcon><DoneIcon/></ListItemIcon>
              <ListItemText>Verify Account</ListItemText>
            </ListItem>
            <ListItem button onClick={()=>changeSelected('payment')}>
              <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
              <ListItemText>Payments</ListItemText>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={onLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <>{selectedDash === 'profile' && <MyProfile />}</>
          <>{selectedDash === 'schedules' && <Schedules />}</>
          <>{selectedDash === 'messages' && <Messages />}</>
          <>{selectedDash === 'quizes' && <Quizes />}</>
          <>{selectedDash === 'review' && <Review />}</>
          <>{selectedDash === 'create' && <CreateQuiz />}</>
          <>{selectedDash === 'verify' && <VerifyAccount />}</>
          <>{selectedDash === 'payment' && <Payments />}</>
        </Main>
      </Box>
    </div>
  )
}

