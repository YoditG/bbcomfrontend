import React from 'react'
import {useRef, useState,useCallback} from 'react'
import Webcam from 'react-webcam'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    webcamWindow:{
        height: "500px",
        width: "100%",
        borderRadius:"20px"
    }

}));

const WebcamStreamCapture = (props) => {
    const classes = useStyles();
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const { screenSize} = props
    const videoConstraints = {
        width: 163,
        height: 500,
        facingMode: "environment"
      };

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = React.useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStopCaptureClick = useCallback(() => {
            mediaRecorderRef.current.stop();
            setCapturing(false);
        }, 
        [mediaRecorderRef, webcamRef, setCapturing]
    );

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    return (
        <Grid container style={{border: "1px solid pink"}}>
        <Grid item  xs={screenSize.isDesktopOrLaptop?8:12} style={{width:"40%"}}>
            <Webcam 
            height= "500"
            width= "500"
            audio={false} 
            ref={webcamRef} 
            style={{width:"40vh",
            objectFit: "cover",
            position: "absolute",
            borderRadius: "20px"}}/>
            {capturing ? (
                <button onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
            <button onClick={handleStartCaptureClick}>Start Capture</button>
            )}
            {recordedChunks.length > 0 && (
                <button onClick={handleDownload}>Download</button>
            )}
            </Grid>
      </Grid>
    );
  
};

export default WebcamStreamCapture
  
  //ReactDOM.render(<WebcamStreamCapture />, document.getElementById("root"));
  
  // https://www.npmjs.com/package/react-webcam
  