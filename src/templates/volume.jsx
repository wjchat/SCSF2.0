import React, { useEffect, useState } from "react"
import Head from "../components/head.jsx"
import SideContent from "../components/sideContent.jsx"
import TopNav from "../components/topNav.jsx"
import Video from "../components/video.jsx"
import PageTransition from "../components/pageTransition.jsx"
import { gsap, Power3 } from "gsap"
import { graphql } from "gatsby"

import MobNav from "../components/MobNav.jsx"
import MobArticle from "../components/MobArticle.jsx"
import MobSubmission from "../components/MobSubmission.jsx"


import "../style/layout.css"
import "../style/templateLayout.scss"


const Page = props => {
    return (
        <>
        <div className="desktop">
            <div className="topNav">
                <TopNav
                aboutText = {props.aboutText}
                 />
            </div>
            <div className="sideContent">
                <SideContent
                   volumesCount = {props.volumesCount}
                    trigger = {props.trigger}
                    duration={props.duration}
                    changePage={bool => props.changePage(bool)}
                    volume={props.volume}
                />
            </div>
            <div className="video">
                <Video video={props.volume.vid[0].url} />
                <PageTransition 
                delayIn = {.2}
                delayOut = {.2}
                trigger = {props.trigger} />
            </div>
            <div className="footer"></div>
        </div>
          <div className = "mobile">
                <div className = "MobNav">
                <MobNav
                volumesCount = {props.volumesCount}
                current = {props.volume.strapiId}
                aboutText = {props.aboutText} />
                </div>
                <div className = "mVideo">
                <Video
                video={props.volume.vid[0].url}
                 /></div>
                <div className = "MobArticle">
                <MobArticle
                volume={props.volume}
                /></div>
                <div className = "MobSubmission"><MobSubmission/></div>
          </div>
        </>
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
            vid {
                url
            }
        }          
        allStrapiVolume(sort: {fields: strapiId, order: ASC}) {
            edges {
              node {
                Title
                strapiId
              }
            }
          }
          strapiAbout {
            text
          }
    }
`

const Container = ({ data }) => {
    const volume = data.strapiVolume
    const aboutText = data.strapiAbout.text
    const volumesCount = data.allStrapiVolume.edges
    let animate
    const [duration, updateDuration] = useState(1)
    const [trigger, changePage] = useState(false)
    return (
        <div>
            <Head />
            <Page
               volumesCount = {volumesCount}
                trigger = {trigger}
                duration={duration}
                changePage={bool => changePage(bool)}
                volume={volume}
                aboutText = {aboutText}
            />
        </div>
    )
}

export default Container
