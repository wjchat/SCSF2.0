import React,{useEffect, useState} from 'react';
import words from './articleText.js'
import "../style/article.scss"
import Form from './form.jsx'
import Arrow from '../images/arrow.svg'
import gsap from "gsap"


const Article = props =>{
    let scroll;
    const title = "Sex"
    const subject = "Josie Andrews"
    const duration = props.duration
    useEffect(()=>{
        if(scroll != null){
            props.updateContainer(scroll)
            let instance = scroll;
            let message = scroll.getElementsByClassName("scrollDown")[0]
            props.updateArticleHeight(instance.getElementsByClassName("heightContainer")[0].offsetHeight)
                instance.addEventListener("wheel", (e)=>{
                    
                    let totalHeight = instance.getElementsByClassName("heightContainer")[0].offsetHeight
//                    console.log("total", totalHeight)
                    let containerHeight = instance.offsetHeight
//                    console.log("container", containerHeight)
                    let adjustedHeight = totalHeight - containerHeight
                    let scrollPos = Math.round(instance.scrollTop)
//                    console.log("adjusted", adjustedHeight)
//                    console.log("scroll", scrollPos)
                    
                    if(scrollPos < 10){
                        props.updateScrollState("top")
                        gsap.to(message, duration, {
                            opacity: 1,
                            filter: "blur(0px)",
                        })
                    } else if(scrollPos > adjustedHeight - 50){
                          props.updateScrollState("bottom")    
                    } else if(scrollPos > 10 && e.deltaY > 0){
                        props.updateScrollState("scrolling")
                        gsap.to(message, duration,{
                            opacity: 0,
                            filter: "blur(2px)",
                        })
                    } else if(scrollPos > 10 && e.deltaY < 0){
                        props.updateScrollState("top")
                    }
                    
                }, {passive:true})
        }
    }, [scroll])
    return(<div 
      ref = {div=>scroll=div}
        className = "articleContainer">
       <div className = "scrollDown">
           <h3>Scroll Down</h3>
           <img src={Arrow} alt="scroll Down"/>
       </div>
       <div className = "heightContainer">
            <h2><span>{title} </span>// {subject}</h2>
            <div className = "article">{words}</div>
            <div className = "formContain">
                <Form />
            </div>
            <div className = "counter"><span>605</span> <br/>
             Stories Told</div>
       </div>
    </div>)
}

export default Article;