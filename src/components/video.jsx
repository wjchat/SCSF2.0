import React from 'react';
import "../style/video.scss"
import vidSource from '../images/reel.mp4'

const Video = props =>{
    return(
    <div className = "videoContainer">
        <video controls src={vidSource}></video>
    </div>
    )
}
export default Video