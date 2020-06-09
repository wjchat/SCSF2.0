import React,{useState, useEffect} from 'react';
import "../style/MobNav.scss";
import Logo from '../images/Matte.svg';
import gsap from 'gsap'

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
          <div className = "vol">Vol. 1</div>
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
              <div>ABOUT TEXT WILL GO HERE WHATEVER IT IS ABOUT TEXT WILL GO HERE WHATEVER IT ISABOUT TEXT WILL GO HERE WHATEVER IT ISABOUT TEXT WILL GO HERE WHATEVER IT ISABOUT TEXT WILL GO HERE WHATEVER IT IS</div>
          </div>
      </div>)
}

export default MobNav