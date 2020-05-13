import React from 'react'

import Head from '../components/head.jsx'
import SideContent from "../components/sideContent.jsx"
import TopNav from "../components/topNav.jsx"
import Video from '../components/video.jsx'

import "../style/layout.css"
import "../style/templateLayout.scss";

const Page = () =>{
    return(
    <div className = "main">
       <div className = "topNav"><TopNav /></div>
        <div className = "sideContent"><SideContent /></div>
        <div className = "video"><Video /></div>
        <div className = "footer"></div>
    </div>
    )
}

const Container = () =>{
    return(
        <div>
            <Head />
            <Page />
        </div>
    )
}

export default Container