import './style.css';
import { StreamCall, StreamVideo} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { MyUILayout } from './MyUILayout';
import { call,client } from './creatingCall.js';




export const VideoCall = () => {
    return (
        <>
            <StreamVideo client={client}>
                <StreamCall call={call}>
                    <MyUILayout />
                </StreamCall>
            </StreamVideo>
        </>
    )}
