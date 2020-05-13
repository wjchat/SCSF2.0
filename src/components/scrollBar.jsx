import React, { useState, useEffect } from "react"
import gsap from "gsap"
import "../style/scrollbar.scss"

const Scrolly = props =>{
    let animate
    const [tween, updateTween] = useState(null)
    useEffect(()=>{
        let height = 80000 / props.height;
        gsap.set(animate,{
            height: height
        })
        if(props.divHeight != 0){
            updateTween(gsap.to(animate, 1,{
                y: props.divHeight - height - 1,
                ease: "none",
                paused: true,
            }))
        console.log(props.divHeight)
        }
    }, [props.height, props.divHeight])
    useEffect(()=>{
        if(tween != null){   
            tween.progress(props.percent)
        }
    }, [props.percent, tween])

    return(
            <div ref = {div=>animate=div} className = "scrollBar"></div>
        )
}
export default Scrolly
