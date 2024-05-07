import { CallControls, CallingState, SpeakerLayout, StreamTheme, useCalls } from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";


export const MyUILayout = () => {

    const call = useCalls()

    if(call.state !== CallingState.JOINED) {
        call.state = CallingState.JOINED
    }

    const handleOnLeave = () => {
        window.location.href = '/searchDoctor'
    }

    return (
        <StreamTheme>
            <SpeakerLayout participantsBarPosition='bottom' />
            <CallControls onLeave={handleOnLeave} />
        </StreamTheme>
    );
};
