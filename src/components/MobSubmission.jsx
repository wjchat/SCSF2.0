import React,{useEffect, useState} from 'react';
import Form from './form.jsx'
import "../style/MobSubmission.scss"
import gsap from "gsap"


const MobSubmission = props =>{

  const title = "Sex"
  const subject = "Josie Andrews"
    
    return(
      <div className = "MobSubmissionContainer">
        <h1 className = "title">Tell Your <br/> Story</h1>
        <div className = "line"></div>
        <h2 className = "caption">Whatup PUSSY. This is where you submit your punk ass videos or images. Maybe we'll use it. MAYBE NOT.</h2>
        <div className = "form"><Form/></div>
        <div className = "counter"><span>605</span> <br/>
          Stories Told
        </div>
    </div>)
}

export default MobSubmission;