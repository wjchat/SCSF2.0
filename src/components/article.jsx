import React,{useEffect, useState} from 'react';
import words from './articleText.js'
import "../style/article.scss"
import Form from './form.jsx'

const Article = props =>{
    let scroll;
    const title = "Sex"
    const subject = "Josie Andrews"
    useEffect(()=>{
        if(scroll != null){
            let instance = scroll;
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
                    } else if(scrollPos > adjustedHeight - 10){
                          props.updateScrollState("bottom")    
                    } else if(scrollPos > 10 && e.deltaY > 0){
                        props.updateScrollState("scrolling")
                    } else if(scrollPos > 10 && e.deltaY < 0){
                        props.updateScrollState("top")
                    }
                    props.updatePercent((scrollPos / adjustedHeight).toFixed(8))
                    
                }, {passive:true})
        }
    }, [scroll])
    return(<div 
      ref = {div=>scroll=div}
        className = "articleContainer">
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