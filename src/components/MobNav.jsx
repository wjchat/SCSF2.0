import React,{useState, useEffect} from 'react';
import "../style/MobNav.scss";
import Logo from '../images/Matte.svg';
import {gsap, Power2, Power1} from 'gsap'
import Swipe from 'react-easy-swipe';
import MobileMenuItem from './MobileMenuItem.jsx'

const VolumeSelector = props =>{
    let animate
    const open = () =>{
        gsap.to(animate, .4,{
            x: "0%",
            opacity: 1,
            pointerEvents: "all",
            ease: Power1.easeOut,
        })
        document.body.getElementsByTagName("video")[1].pause();

    }
    const close = (delay) => {
        if(!delay){
            delay = 0;
        }
        gsap.to(animate, .3, {
            x: " -100%",
            opacity: 0,
            pointerEvents: "none",
            ease: Power2.easeIn,
            delay: delay,
        })
    }
    return<>
        <span
        onClick = {()=>open()}
        >Vol. {props.current}</span>
        <div className = "volumeSelectionOverlay">
            <ul ref = {div=>animate=div}>
               <Swipe
               onSwipeLeft = {()=>close()}
               >
                {props.volumesCount.map((item, i)=>
                                        <MobileMenuItem 
                                        open = {()=>open()}
                                        close = {()=>close()}
                                        item = {item} />
                                       )} 
                </Swipe>
            </ul>
        </div>
    </>
}
const MobNav = props =>{
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
      <div className = "MobNavContainer">
          <div className = "vol"><VolumeSelector 
          volumesCount = {props.volumesCount}
          current = {props.current}
          /></div>
          <div>
              <a href="https://matteprojects.com/" target = "_blank">
                  <img src={Logo} alt="mattprojects.com"/>
              </a>
          </div>
          <div 
            onClick = {()=>updateShow(true)}
            className = "about">
              About
          </div>
          <div ref = {div=>animate=div} className = "aboutText">
              <h1 
                onClick = {()=>updateShow(false)}
                className = "exitAbout">
                  X
              </h1>
              <div>{props.aboutText}</div>
          </div>
      </div>)
}

export default MobNav