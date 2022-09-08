import { createClient, createMicrophoneAndCameraTracks,createScreenVideoTrack } from "agora-rtc-react";

const appId = "be6f94f9323447288b7e42cd71bd8ce5";
const token =''
export const config = { mode: "rtc", codec: "vp8", appId: appId };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const useScreenVideoTrack=createScreenVideoTrack();

export const channelName = "main";
