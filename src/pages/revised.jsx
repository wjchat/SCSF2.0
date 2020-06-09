import React from 'react'

import Head from '../components/head.jsx'
import SideContent from "../components/sideContent.jsx"
import TopNav from "../components/topNav.jsx"
import Video from '../components/video.jsx'

import MobNav from "../components/MobNav.jsx"
import MobArticle from "../components/MobArticle.jsx"
import MobSubmission from "../components/MobSubmission.jsx"

import "../style/layout.css"
import "../style/templateLayout.scss";

const Page = () =>{
    return(
    <div className = "main">
      <div className = "desktop">
       <div className = "topNav"><TopNav /></div>
        <div className = "sideContent"><SideContent /></div>
        <div className = "video"><Video /></div>
        <div className = "footer"></div>
      </div>
      <div className = "mobile">
        <div className = "MobNav"><MobNav /></div>
        <div className = "mVideo"><Video /></div>
        <div className = "MobArticle"><MobArticle/></div>
        <div className = "MobSubmission"><MobSubmission/></div>
      </div>
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