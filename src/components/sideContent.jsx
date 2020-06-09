import React, {useState, useEffect} from 'react'
import "../style/sideContent.scss"
import Article from "./article.jsx";
import ScrollBar from './scrollBar.jsx'
import {gsap, Power2} from 'gsap'
import axios from 'axios';
import { useStaticQuery, graphql } from "gatsby";
import TransitionLink from "gatsby-plugin-transition-link";
import PageTransition from "./pageTransition.jsx"


const ListItem = props =>{
    const handleHover = () =>{
        if(props.title!=null){
            props.updateTitle(props.item.Title)
        }
    }
    return(<div className = "listContain">
          <li key={props.item.strapiId}
            onMouseOver = {()=>handleHover()}
            >
            <TransitionLink 
            onClick = {()=>props.updateTitle("")}
            exit={{
                        length: 1.1,
                        trigger: ()=>props.changePage(true),
                    }}
            entry={{
                        delay: .9,
                    }}
            className = "link"
            activeClassName = "active" to = {`/volume/${props.item.strapiId}`}>Vol. {props.item.strapiId}</TransitionLink>
          </li>
    </div>)
}
const NavSection = props =>{
    let duration = props.duration
    const items = props.volumesCount
    let animate
    let titleRef
    const [message, updateMessage] = useState("So Close So Far");
    const[title, updateTitle] = useState("")
    const [canGo, updateGo] = useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            updateGo(true)
        }, 2000)
    }, [])
    useEffect(()=>{
        if(titleRef!=null){
            if(title!=null && title!= "" && canGo){
                let tl = gsap.timeline()
                tl.to(titleRef,.2,{
                    height: "3vw",
                    ease: Power2.easeInOut
                })
                tl.to(titleRef, .1,{
                    opacity: 1,
                    ease: "linear",
                }, `-=.05`)
            } else{
                let tl = gsap.timeline();
                tl.set(titleRef, {
                    opacity:0,
                })
                tl.to(titleRef, .2,{
                    height: "0vw",
                    ease: Power2.easeInOut,
                })
            }
        }
    }, [title,titleRef])
    useEffect(()=>{
        if(props.scrollState === "top"){
            animate.classList.remove("unclickable")
            if(message === "Tell Your Story"){
                let tl = gsap.timeline()
                tl.to(animate.getElementsByTagName("h1"), duration, {
                    opacity: 0,
                    filter: "blur(2px)",
                })
                tl.call(()=>updateMessage("So Close So Far"))
                tl.to(animate.getElementsByTagName("ul"),duration, {
                    opacity: 1,
                    filter: "blur(0px)",
                })
                tl.to(animate.getElementsByTagName("h1"), duration,{
                    opacity: 1,
                    filter: "blur(0px)",
                }, `-=${duration}`)
            } else{
                gsap.to(animate, duration,{
                    opacity: 1,
                    filter: "blur(0px)",
                })
            }
        } else if(props.scrollState === "scrolling"){
            animate.classList.add("unclickable")
            gsap.to(animate, duration,{
                opacity: 0,
                filter: "blur(2px)",
            })
        } else if(props.scrollState === "bottom"){
            animate.classList.add("unclickable")
            let tl = gsap.timeline();
            tl.set(animate.getElementsByTagName("ul"),{
                opacity: 0,
                filter: "blur(2px)",
            })
            tl.call(()=>{updateMessage("Tell Your Story")})
            tl.to(animate, duration, {
                opacity: 1,
                filter: "blur(0px)",
            })
        }
    }, [props.scrollState])
    return(
        <div ref = {div=>animate=div} className = "navSection unclickable">
                <h1 className ="portalTingTitle">{message}</h1>
            <div 
               onMouseLeave = {()=>updateTitle("")}
               className = "volumes">
                <ul>
                   {
                    items.map((item, i) => (
                        <ListItem
                        title = {title}
                         updateTitle={(newTitle)=>updateTitle(newTitle)}
                         item = {item.node} 
                         changePage = {(bool)=>props.changePage(bool)} />
))
                    }
                </ul>
                <div ref = {div=>titleRef=div} className = "title">{title}</div>
                <div className = "border"></div>
            </div>
        </div>
    )
}
const SideContent = props => {
    let heightDiv
    const [scrollState, updateScrollState] = useState("top");
    const [articleHeight, updateArticleHeight] = useState(null)
    const [divHeight, updateDivHeight] = useState(null)
    const [container, updateContainer] = useState(null)
    const duration = .3
    let animate
    useEffect(()=>{
        if(props.trigger){
            if(animate!= null){
                gsap.set(animate,{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    backgroundColor: "white",
                    top: 0,
                    left: 0,
                })
            }
        }
    }, [props.trigger, animate])
    return(<div className = "sideContentContainer">
        <ScrollBar 
        container = {container}
        divHeight = {divHeight}
        height = {articleHeight} />
        <NavSection
        volumesCount = {props.volumesCount}
        durationPage = {props.duration}
        duration = {duration}
        changePage = {(bool)=>props.changePage(bool)}
        duration = {duration}
        scrollState = {scrollState} /> 
        <Article 
        updateDivHeight = {(height)=>updateDivHeight(height)}
        title = {props.volume.Title}
        subject = {props.volume.Subject} 
        content = {props.volume.typeContent}
        published  = {props.volume.published}
        duration = {duration}
        updateContainer = {(contain)=>updateContainer(contain)}
        updateArticleHeight = {(number) => updateArticleHeight(number)}
        updateScrollState = {(newState)=>updateScrollState(newState)} />
        <PageTransition delayIn = {0} 
        delayOut = {0}
        trigger = {props.trigger}/>
    </div>)
}

export default SideContent