import React, {useState, useEffect} from 'react'
import "../style/sideContent.scss"
import Article from "./article.jsx";
import ScrollBar from './scrollBar.jsx'
import gsap from 'gsap'

import { Link } from "gatsby";

const NavSection = props =>{
    let animate
    let duration = .3
    const [message, updateMessage] = useState("So Close So Far");
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
            <h1>{message}</h1>
            <div className = "volumes">
                <ul>
                    <li><Link>Vol. 1</Link></li>
                    <li><Link>Vol. 2</Link></li>
                    <li><Link>Vol. 3</Link></li>
                </ul>
                <div className = "border"></div>
            </div>
        </div>
    )
}
const SideContent = props => {
    let heightDiv
    const [scrollState, updateScrollState] = useState("top");
    const [articleHeight, updateArticleHeight] = useState(null)
    const [percent, updatePercent] = useState(0);
    const [divHeight, updateDivHeight] = useState(0)
    useEffect(()=>{
        updateDivHeight(heightDiv.offsetHeight)
    }, [heightDiv])
    return(<div ref ={div=>heightDiv=div} className = "sideContentContainer">
        <NavSection scrollState = {scrollState} /> 
        <Article 
        updateArticleHeight = {(number) => updateArticleHeight(number)}
        updatePercent = {(newPercent)=>updatePercent(newPercent)}
        updateScrollState = {(newState)=>updateScrollState(newState)} />
        <ScrollBar 
        divHeight = {divHeight}
        percent = {percent}
        height = {articleHeight} />
    </div>)
}

export default SideContent