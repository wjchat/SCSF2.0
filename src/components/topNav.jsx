import React,{useState, useEffect} from 'react';
import "../style/topNav.scss";
import Logo from '../images/Matte.svg';
import gsap from 'gsap'
import{ useStaticQuery, graphql } from 'gatsby'

const TopNav = props =>{
    const aboutText = props.aboutText
    const [showAbout, updateShow] = useState(false);
    let animate
    useEffect(()=>{
        if(showAbout){
            gsap.to(animate, .2, {
                opacity: 1,
            })
        }else{
            gsap.to(animate, .2, {
                opacity: 0,
            })
        }
    }, [showAbout])
    return(
    <div className = "topNavContainer">
        <div><h4
        onMouseEnter = {()=>updateShow(true)}
        onMouseLeave = {()=>updateShow(false)}
        >About</h4></div>
        <div>
            <a href="https://matteprojects.com/" target = "_blank">
                <img src={Logo} alt="mattprojects.com"/>
            </a>
        </div>
        <div ref = {div=>animate=div} className = "aboutText">
            <div>{aboutText}</div>
        </div>
    </div>)
}

export default TopNav