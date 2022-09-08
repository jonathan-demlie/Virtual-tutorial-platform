import { useEffect, useState } from "react";
import { useClient, screenVideoTrack } from "./settings";

import styled from 'styled-components'
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
const Video = styled(VideocamIcon)`
background-color:rgb(80,80,80);
border-radius:50%;
color:white;
padding:10px;
`
const VideoOff = styled(VideocamOffIcon)`
background-color:rgb(255,70,70);
border-radius:50%;
color:white;
padding:10px;
`
const Screen = styled(PresentToAllIcon)`
background-color:rgb(80,80,80);
border-radius:50%;
color:white;
padding:10px;
`
const ScreenOff = styled(CancelPresentationIcon)`
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
export default function Controls(props) {
    const client = useClient();
    const { tracks, setStart, setInCall } = props;
    const [trackState, setTrackState] = useState({ video: true, audio: true, screen: false });
    // const {ready,tracks:t}=useScreenVideoTrack()
    
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
            // if(ready&&t){
                
            // }
        }
    };
    const navigate=useNavigate()
    const leaveChannel = async () => {
        await client.leave();
        client.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setStart(false);
        setInCall(false);
        navigate('/room')
    };

    

    const screenShare=async()=>{
    }
    return (
        <Control>
            <Button onClick={() => mute("audio")}>
                {trackState.audio ? <Mic style={{ fontSize: "30px" }} /> : <MicOff style={{ fontSize: "30px" }} />}
            </Button>
            <Spacer />
            <Button onClick={() => mute("video")}>
                {trackState.video ?
                    <Video style={{ fontSize: "30px" }} /> :
                    <VideoOff style={{ fontSize: "30px" }} />}
            </Button>
            <Spacer />
            <Button onClick={()=>screenShare()}>
                {trackState.screen ?
                    <ScreenOff style={{ fontSize: "30px" }} /> :
                    <Screen style={{ fontSize: "30px" }} />}
            </Button>
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Button onClick={() => leaveChannel()}>
                <CallIcon style={{ width: "45px" }} />
            </Button>
        </Control>
        //   <Grid item>
        //     <Button
        //       variant="contained"
        //       color="default"
        //       onClick={() => leaveChannel()}
        //     >
        //       Leave
        //       <ExitToAppIcon />
        //     </Button>
        //   </Grid>
        // </Grid>
    );
}
