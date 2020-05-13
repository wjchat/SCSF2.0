import React, { useState, useEffect } from "react"
import gsap from "gsap"
import "../style/scrollbar.scss"

const Scrolly = props =>{
    let animate
    const [tween, updateTween] = useState(null)
    const[container, updateContainer] = useState(null);
    useEffect(()=>{
        let height = 80000 / props.height;
        gsap.set(animate,{
            height: height
        })
        if(props.divHeight != null){
            updateTween(gsap.to(animate, 1,{
                y: props.divHeight - height,
                ease: "none",
                paused: true,
            }))
        }
    }, [props.height, props.divHeight])
    useEffect(()=>{
        if(props.container !=null && props.height != null && props.divHeight != null && tween != null){
                props.container.addEventListener("scroll", ()=>{
                    tween.progress((props.container.scrollTop.toFixed(5) / (props.height -props.divHeight ).toFixed(6)) ) 
                    console.log((props.container.scrollTop.toFixed(5) / (props.height -props.divHeight ).toFixed(6)) )
            })
        }
    }, [props.container, props.height, props.divHeight, tween])

//    useEffect(()=>{
//        if(tween != null){   
//            tween.progress(props.percent)
//            console.log(props.percent)
//        }
//    }, [props.percent, tween])

    return(
            <div ref = {div=>animate=div} className = "scrollBar"></div>
        )
}
export default Scrolly
