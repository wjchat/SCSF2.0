import React,{useEffect, useState} from 'react';
import "../style/MobArticle.scss"
import gsap from "gsap"

import ReactMarkdown from "react-markdown"
import Moment from "react-moment"

const MobArticle = props =>{

    return(
      <div className = "MobArticleContainer">
        <h1 className = "scsf">So Close <br/> So Far</h1>
        <div className = "line"></div>
        <h2 className = "titlesub"><span>{props.volume.Title} </span>// {props.volume.Subject}</h2>
        <div className = "article">
           <Moment format = "MMM Do, YYYY">{props.published}</Moment>
           <br/>
           <br/>
           <br/>
            <ReactMarkdown
            className = "content"
            source = {props.volume.typeContent} />
        </div>
    </div>)
}

export default MobArticle;