import React,{useEffect, useState} from 'react';
import words from './articleText.js'
import "../style/MobArticle.scss"
import gsap from "gsap"


const MobArticle = props =>{

  const title = "Sex"
  const subject = "Josie Andrews"
    
    return(
      <div className = "MobArticleContainer">
        <h1 className = "scsf">So Close <br/> So Far</h1>
        <div className = "line"></div>
        <h2 className = "titlesub"><span>{title} </span>// {subject}</h2>
        <div className = "article">{words}</div>
    </div>)
}

export default MobArticle;