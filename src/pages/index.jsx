import React, { useEffect, useState, useCallback } from "react"
import SEO from "../components/seo"

import Landing from "../components/landing.jsx"
import SubmissionPage from "../components/submission.jsx"
import Mobile from '../components/mobile.jsx'
import Head from "../components/head.jsx"
import Logo from "../images/Matte.svg"
import { TimelineMax, TweenLite, gsap, Power3 } from "gsap"
import "../style/loader.scss"
import { useStaticQuery, graphql } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import { TransitionPortal } from "gatsby-plugin-transition-link";

import { CSSPlugin } from 'gsap/CSSPlugin'


// Force CSSPlugin to not get dropped during builds
gsap.registerPlugin(CSSPlugin)


const duration = 1;

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
    const data = useStaticQuery(graphql`
    query CountQueryFront{
      allStrapiVolume {
        totalCount
      }
    }
`)
    
    let enterButton
    let animate
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
    return (
        <h1 ref={div => (enterButton = div)} className={props.className}>
            <span
                className="enterClick"
                onMouseOver={() => toggleHover(true)}
                onMouseLeave={() => toggleHover(false)}
            >
                <TransitionLink 
                exit = {{
                        length: duration * 2.5, 
                        trigger: ()=> props.changePage(true),
                    }}
                entry ={{
                        delay: duration,
                    }}
                to = {`/volume/${data.allStrapiVolume.totalCount}`
                     }>enter</TransitionLink>
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
    return (
        <div ref = {div=>background=div} className="loadingAnimate">
            <div ref={div => (animate = div)}>
                <img src={Logo} alt="Matte" />
                {showEnter ? (
                    <EnterButton 
                    changePage = {(bool)=>props.changePage(bool)}
                    className="enter" />
                ) : (
                    <EnterButton className="enter hide" />
                )}
            </div>
        </div>
    )
}
/////

const Index = props =>{
    let animate
    let fade
    const [trigger, changePage] = useState(false);

    useEffect(()=>{
        if(animate!=null && fade != null){
            if(trigger){
                let tl = gsap.timeline();
                tl.to(fade, duration * .6, {
                    opacity: 0,
                })
                tl.set(animate,{
                    width: "100vw",
                    ease: Power3.easeIn
                })
                tl.set(animate,{
                    left: "auto",
                    right: 0,
                })
                tl.to(animate, duration, {
                    width: "0vw",
                    ease: Power3.easeOut,
                }, `+=${duration * .6}`)
            }
        }
    }, [trigger, animate, fade])
    return(<div >
      <Head />
       <div ref = {div=>fade=div}>
            <OpeningAnimation
            changePage = {(bool)=>changePage(bool)} />
       </div>
        <TransitionPortal level = "top">
                <div ref = {div=>animate=div} className = "animationScreen"></div>
        </TransitionPortal>
    </div>)
}

export default Index