import React, { useEffect, useState } from "react"
import Head from "../components/head.jsx"
import SideContent from "../components/sideContent.jsx"
import TopNav from "../components/topNav.jsx"
import Video from "../components/video.jsx"
import TransitionLink from "gatsby-plugin-transition-link"
import PageTransition from "../components/pageTransition.jsx"
import { gsap, Power3 } from "gsap"
import { graphql } from "gatsby"

import "../style/layout.css"
import "../style/templateLayout.scss"

const Page = props => {
    return (
        <div className="main">
            <div className="topNav">
                <TopNav />
            </div>
            <div className="sideContent">
                <SideContent
                    trigger = {props.trigger}
                    duration={props.duration}
                    changePage={bool => props.changePage(bool)}
                    volume={props.volume}
                />
            </div>
            <div className="video">
                <Video video={props.volume.video.absolutePath} />
                <PageTransition 
                delayIn = {.2}
                delayOut = {.2}
                trigger = {props.trigger} />
            </div>
            <div className="footer"></div>
        </div>
    )
}

export const query = graphql`
    query ArticleQuery($id: Int!) {
        strapiVolume(strapiId: { eq: $id }) {
            strapiId
            Subject
            Title
            published
            typeContent
            video {
                relativePath
            }
        }
    }
`

const Container = ({ data }) => {
    const volume = data.strapiVolume
    let animate
    const [duration, updateDuration] = useState(1)
    const [trigger, changePage] = useState(false)
    return (
        <div>
            <Head />
            <Page
                trigger = {trigger}
                duration={duration}
                changePage={bool => changePage(bool)}
                volume={volume}
            />
        </div>
    )
}

export default Container
