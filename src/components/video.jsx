import React,{useEffect} from 'react';
import "../style/video.scss"

const Video = props =>{
    let vid
    useEffect(()=>{
        if(vid!= null && window.innerWidth > 450 && props.desktop ){
            let inst = vid
            setTimeout(()=>{
                inst.play();
            }, 2000)
        }
    }, [vid])
//    console.log(props.video)
    return(
    <div className = "videoContainer">
        <video className = {props.className} ref = {video=>vid=video} controls src={props.video}></video>
    </div>
    )
}
export default Video