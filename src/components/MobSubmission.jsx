import React,{useEffect, useState} from 'react';
import Form from './form.jsx'
import "../style/MobSubmission.scss"
import gsap from "gsap"
import axios from "axios"
import ReactMarkdown from "react-markdown"
const api = "https://scsf.herokuapp.com/"

const MobSubmission = props =>{
    const [count, updateCount] = useState(0)
    useEffect(()=>{
            setTimeout(()=>{
                    axios.get(api+'user-uploads/count')
                      .then(function (response) {
                        updateCount(response.data);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
            }, 300)
    }, [])
    return(
      <div className = "MobSubmissionContainer">
        <h1 className = "title">Tell Your <br/> Story</h1>
        <div className = "line"></div>
        <h2 className = "caption">
            <ReactMarkdown
            source = {props.aboutSub} /> <span className = "privacyPolicy"><a href = '/privacyPolicy' target = "_blank">Privacy Policy.</a></span>
        </h2>
        <div className = "form"><Form
        updateCount = {(n)=>updateCount(n)}
        count = {count}
        /></div>
        <div className = "counter"><span>{count}</span> <br/>
          Stories Told
        </div>
    </div>)
}

export default MobSubmission;