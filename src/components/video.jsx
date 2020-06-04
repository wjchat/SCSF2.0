import React,{useEffect} from 'react';
import "../style/video.scss"

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
        <video ref = {video=>vid=video} controls src={props.video}></video>
    </div>
    )
}
export default Video