import React,{useEffect} from 'react';
import "../style/video.scss"
import vidSource from '../images/reel.mp4'

const Video = props =>{
    let vid
    useEffect(()=>{
        if(vid!= null){
            let inst = vid
            setTimeout(()=>{
                inst.play();
            }, 2000)
        }
    }, [vid])
    return(
    <div className = "videoContainer">
        <video ref = {video=>vid=video} controls src={vidSource}></video>
    </div>
    )
}
export default Video