import { useState, useEffect } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  useScreenVideoTrack,
} from "./settings.js";
import { Grid } from "@mui/material";
import Video from "./Video";
import Controls from "./Controls";
import styled from 'styled-components'
import { useLocation } from "react-router-dom";

import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { useNavigate } from "react-router-dom";

const Control = styled.div`
display:flex;
padding:20px;
`
const Mic = styled(MicIcon)`
background-color:rgb(80,80,80);
border-radius:50%;
color:white;
padding:10px;
`
const MicOff = styled(MicOffIcon)`
background-color:rgb(255,70,70);
border-radius:50%;
color:white;
padding:10px;
`
const VideoIcon = styled(VideocamIcon)`
background-color:rgb(80,80,80);
border-radius:50%;
color:white;
padding:10px;
`
const VideoIconOff = styled(VideocamOffIcon)`
background-color:rgb(255,70,70);
border-radius:50%;
color:white;
padding:10px;
`
const ScreenIcon = styled(PresentToAllIcon)`
background-color:rgb(80,80,80);
border-radius:50%;
color:white;
padding:10px;
`
const ScreenIconOff = styled(CancelPresentationIcon)`
background-color:rgb(255,70,70);
border-radius:50%;
color:white;
padding:10px;
`
const CallIcon = styled(CallEndIcon)`
background-color:rgb(255,70,70);
border-radius:30%;
color:white;
padding:10px;
`
const Spacer = styled.div`
width:5px;
`
const Button = styled.button`
background-color:#222222;
border:none;
`
const Wrapper = styled.div`
display:flex;
background-color:rgba(0,0,0,0.87);
width:100vw;
height:100vh;
align-items:center;
flex-direction:column;
`
const Vid = styled.div`
margin-top:2vh;
width: 95%;
height:90%;
background-color:white;
border-radius:10px;
`

export default function VideoCall() {
  const location = useLocation();
  const channelName = location.pathname.split('/')[2];
  console.log(channelName)
  console.log(channelName)
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const [inCall, setInCall] = useState(true);
  const [screenCast,setScreenCast]=useState(false)
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  // const {ready,tracks}=useScreenVideoTrack()
  console.log(ready)
  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          // console.log("this is screen video")
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(config.appId, name, null);
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [channelName, client, ready, tracks]);
console.log(tracks)
  const [trackState, setTrackState] = useState({ video: true, audio: true, screen: false });
  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    } else if (type === 'screen') {
      setTrackState((ps) => {
        return { ...ps, screen: !ps.screen };
      });
    }
  };

  
  const navigate = useNavigate()
  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
    navigate('/room')
  };
  // const screenShare=()=>{
  //   setScreenCast(true);
  //   console.log("new screen")
  // }
  return (
    <Wrapper>
      <Vid>
        {start && tracks && <Video tracks={tracks} users={users} />}
      </Vid>
      <Control>
            <Button onClick={() => mute("audio")}>
                {trackState.audio ? <Mic style={{ fontSize: "30px" }} /> : <MicOff style={{ fontSize: "30px" }} />}
            </Button>
            <Spacer />
            <Button onClick={() => mute("video")}>
                {trackState.video ?
                    <VideoIcon style={{ fontSize: "30px" }} /> :
                    <VideoIconOff style={{ fontSize: "30px" }} />}
            </Button>
            <Spacer />
            <Button onClick={()=>mute('screen')}>
                {trackState.screen ?
                    <ScreenIconOff style={{ fontSize: "30px" }} /> :
                    <ScreenIcon style={{ fontSize: "30px" }} />}
            </Button>
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Button onClick={() => leaveChannel()}>
                <CallIcon style={{ width: "45px" }} />
            </Button>
        </Control>
    </Wrapper>
  );
}
