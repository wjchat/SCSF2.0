import React, { useEffect, useState } from "react"
import Head from "../components/head.jsx"
import SideContent from "../components/sideContent.jsx"
import TopNav from "../components/topNav.jsx"
import Video from "../components/video.jsx"
import Footer from "../components/footer.jsx"
import PageTransition from "../components/pageTransition.jsx"
import { gsap, Power3 } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { graphql } from "gatsby"

import MobNav from "../components/MobNav.jsx"
import MobArticle from "../components/MobArticle.jsx"
import MobSubmission from "../components/MobSubmission.jsx"


import "../style/layout.css"
import "../style/templateLayout.scss"

gsap.registerPlugin(ScrollTrigger);
let ting = ScrollTrigger


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
                  aboutSub = {props.aboutSub}
                   volumesCount = {props.volumesCount}
                    trigger = {props.trigger}
                    duration={props.duration}
                    changePage={bool => props.changePage(bool)}
                    volume={props.volume}
                />
            </div>
            <div className="video">
                <Video 
                desktop = {true}
                video={props.volume.vid} />
                <PageTransition 
                delayIn = {.2}
                delayOut = {.2}
                trigger = {props.trigger} />
            </div>
            <Footer />
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
                video={props.volume.vid}
                 /></div>
                <div className = "MobArticle">
                <MobArticle
                volume={props.volume}
                /></div>
                <div className = "MobSubmission">
                <MobSubmission
                aboutSub = {props.aboutSub}
                />
                <Footer />
                </div>
          </div>
        </>
    )
}

export const query = graphql`
    query ArticleQuery($id: Int!) {
        strapiVolumes(strapiId: { eq: $id }) {
            strapiId
            Subject
            Title
            published
            typeContent
            vid
        }          
        allStrapiVolumes(sort: {fields: strapiId, order: ASC}) {
            edges {
              node {
                Title
                strapiId
              }
            }
          }
          strapiAbout {
            AboutTheProject
            AboutSubmissions
          }
    }
`

const Container = ({ data }) => {
    const volume = data.strapiVolumes
    const aboutText = data.strapiAbout.AboutTheProject
    const aboutSub = data.strapiAbout.AboutSubmissions
    const volumesCount = data.allStrapiVolumes.edges
    let animate
    const [duration, updateDuration] = useState(1)
    const [trigger, changePage] = useState(false)
    return (
        <div>
            <Head />
            <Page
              aboutSub = {aboutSub}
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
