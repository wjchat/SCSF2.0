import React, { useEffect, useState, useCallback } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Landing from "../components/landing.jsx"
import SubmissionPage from "../components/submission.jsx"
import Mobile from '../components/mobile.jsx'
import Logo from "../images/Matte.svg"
import { TimelineMax, TweenLite } from "gsap"
import "../style/loader.scss"
import { Link } from "gatsby"

import { gsap } from 'gsap'

const DotDotDot = () =>{
    let animate
    useEffect(()=>{
        let tl = new TimelineMax();
        let items = animate.childNodes;
        tl.staggerTo(items, .03,{
            opacity: 1,
        }, .05)
    })
    return(<span ref = {div=>animate=div} className = 'ellipses'>
            <span> . </span>
            <span>. </span>
            <span>. </span>
            <span>. </span>
            <span>. </span>
            <span>. </span>
            <span>. </span>
            <span>. </span>
            <span>. </span>
            <span>.</span>
    </span>)
}
const EnterButton = props => {
    let enterButton
    const [isHovering, toggleHover] = useState(false)
    useEffect(() => {
        if(!isHovering){
        let first = enterButton.childNodes[1]
        let tl = new TimelineMax({ repeat: -1 })
        tl.to(first, 0.03, {
            opacity: 0
        })
            .to(first, 0.7, {
                opacity: 0
            })
            .to(first, 0.03, {
                opacity: 1
            })
            .to(first, 0.7, {
                opacity: 1
            })
        tl.pause()
        setTimeout(()=>{
            tl.play()
        }, 500)
        }
    })
    const handleClick = useCallback(()=>{
        props.onClick();
    })
    
    return (
        <h1 ref={div => (enterButton = div)} className={props.className}>
            <span
                className="enterClick"
                onMouseOver={() => toggleHover(true)}
                onMouseLeave={() => toggleHover(false)}
            >
                <Link to = "/revised">enter</Link>
            </span>
            {isHovering ? <DotDotDot /> : <span className="first"> . </span>}
        </h1>
    )
}
const OpeningAnimation = props => {
    let background
    let animate
    let enterButton
    let tl = new TimelineMax()
    const [showEnter, toggleEnter] = useState(false)
    useEffect(() => {
        let logo = animate.childNodes[0]
        tl.to(
            logo,
            0.4,
            {
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
                ease: "ease.Out"
            },
            `+=.5`
        ).call(
            () => {
                toggleEnter(true)
            },
            this,
            `+=.4`
        )
    }, [])
    const handleClick = useCallback(()=>{
        TweenLite.to(background, .4,{
            opacity: 0,
        })
        setTimeout(()=>{
            props.onClick("firstMain")
        }, 450)
    })
    return (
        <div ref = {div=>background=div} className="loadingAnimate">
            <div ref={div => (animate = div)}>
                <img src={Logo} alt="Matte" />
                {showEnter ? (
                    <EnterButton className="enter" />
                ) : (
                    <EnterButton className="enter hide" />
                )}
            </div>
        </div>
    )
}
/////

const Index = props =>{
    return(<div>
        <OpeningAnimation />
    </div>)
}

export default Index