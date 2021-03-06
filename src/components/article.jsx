import React,{useEffect, useState} from 'react';
import "../style/article.scss"
import Form from './form.jsx'
import Arrow from '../images/Arrow.svg'
import {gsap, Power3} from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import axios from "axios"
import ReactMarkdown from "react-markdown"
import Moment from "react-moment"

gsap.registerPlugin(ScrollTrigger);
let ting = ScrollTrigger;


const api = "https://scsf.herokuapp.com/"
const Article = props =>{
    let scrollRef;
    let articleContent;
    const title = "Sex"
    const subject = "Josie Andrews"
    const duration = props.duration
    const [scroll, updateScroll] = useState(null)
    const [count, updateCount] = useState(12)
    useEffect(()=>{
        axios.get(api+'user-uploads/count')
          .then(function (response) {
            updateCount(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        if(scrollRef!=null){
            let ting = scrollRef
            setTimeout(()=>{
                updateScroll(ting)
            }, 500)
            //allows content to load before giving scrollbar height
        }
    }, [scrollRef])
    useEffect(()=>{
        if(scroll != null){
                props.updateContainer(scroll)
                props.updateDivHeight(scroll.offsetHeight)
                let instance = scroll;
                let message = scroll.getElementsByClassName("scrollDown")[0]
                props.updateArticleHeight(instance.getElementsByClassName("heightContainer")[0].clientHeight)
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
    useEffect(()=>{
        if(scroll != null){
            let elements = scroll.getElementsByClassName("animateThis");
            gsap.set(elements,{
                opacity: 0,
                x: -5,
            })
            let tl = gsap.timeline();
            tl.staggerTo(elements, .8,{
                opacity: 1,
                x: 0,
                ease: Power3.easeOut
            }, -.05, `+=.4`)
        }
    }, [scroll])
    
    //create scroll effect for images
    useEffect(()=>{
        if(articleContent){
            let artTing = articleContent
                let images = artTing.getElementsByTagName("img");
                for(let each of images){ 
                    gsap.set(each, {
                        opacity: 0,
                        y: `${each.clientHeight * -.1}`,
                        scale: .9,
                    })
                }
                setTimeout(()=>{
                    for(let each of images){
                        gsap.to(each, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            scrollTrigger: {
                                once: true,
                                scroller: ".articleContainer",
                                trigger: each,
                                start: "top bottom",
                                end: `+=${each.clientHeight * 1.3}`,
                                scrub: .1,
                            }
                        })
                    }
                }, 500)
            }
    }, [articleContent])
    return(<div 
      ref = {div=>scrollRef=div}
        className = "articleContainer">
       <div className = "scrollDown">
           <img src={Arrow} alt="scroll Down"/>
       </div>
       <div className = "heightContainer">
            <h2 className = "animateThis"><span>{props.title} </span>// {props.subject}</h2>
            <div 
                className = "article">
               <p className = "animateThis"><Moment format = "MMM Do, YYYY">{props.published}</Moment></p>
               <div ref = {div=>articleContent=div} className = "animateThis">
                    <ReactMarkdown 
                    source ={props.content} />
                </div>
            </div>
            <div className = "caption article">
                    <ReactMarkdown 
                    source ={props.aboutSub} />
                    <span className = "privacyPolicy"><a href = '/privacyPolicy' target = "_blank">Privacy Policy.</a></span>
            </div>
            <div className = "formContain">
                <Form 
                count = {count}
                updateCount = {(newCount)=>updateCount(newCount)} />
            </div>
            <div className = "counter"><span>{count}</span> <br/>
             Stories Told</div>
            </div>
    </div>)
}

export default Article;