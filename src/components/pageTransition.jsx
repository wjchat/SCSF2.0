import React,{useEffect} from 'react'
import {gsap, Power2} from "gsap"

const style = {
               height: "105%",
               width: "100%",
               position: "absolute",
                top: 0,
                right: 0,
                left: "auto",
                backgroundColor: "#060608",
                pointerEvents: "none",
                zIndex: 3,
              }
const PageTransition = props =>{
    let animate
    const duration = .6
    useEffect(() => {
        if (animate != null) {
            if (props.trigger) {
                let tl = gsap.timeline()
                tl.set(animate,{
                    width: "0%",
                    left: "0",
                    right: "auto",
                })
                tl.to(animate, duration, {
                    width: "100%",
                    ease: Power2.easeInOut
                }, `+=${props.delayOut}`)
            } else{
                let tl = gsap.timeline();
                tl.to(animate, duration,{
                    width: "0%",
                    ease: Power2.easeInOut,
                }, `+=${duration + props.delayIn}`)
            }
        }
    }, [props.trigger, animate])
    return(<div 
       style = {style}
       ref = {div=>animate=div}>
    </div>)
}

export default PageTransition
