import React, { useCallback, useState, useEffect } from "react"
import { TimelineMax } from "gsap"
import "../style/submission.scss"
import "../style/formItems.scss"
import arrow from "../images/Arrow.svg"

import { gsap, Power2 } from "gsap"
import { CSSPlugin } from "gsap/CSSPlugin"
import axios from "axios"
import AWS from "aws-sdk"
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const localURL = "https://scsf.herokuapp.com/"

// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)

const gold = "#d3c371"
const black = "black"

const Message = props => {
    return (
        <div className={props.className}>
            {props.text != null ? <div>{props.text}</div> : ""}
        </div>
    )
}
const X = props => {
    let animate
    useEffect(() => {
        let tl = new TimelineMax()
        let duration = 0.15

        tl.to(animate, duration, {
            opacity: 1,
            ease: "easeIn"
        }).to(
            animate,
            duration,
            {
                x: 5,
                filter: `blur(0px)`,
                ease: "easeIn"
            },
            `-=${duration * 0.7}`
        )
    }, [animate])
    return (
        <div onClick={props.onClick} ref={div => (animate = div)} className="x">
            <div>X</div>
        </div>
    )
}
const FormContainer = props => {
    let fileBox
    let submitBox
    let fileInput
    let form
    let emailText
    //state tings
    const [fileLabel, updateFileLabel] = useState("Upload File")
    const [files, updateFile] = useState(null)
    const [email, updateEmail] = useState(null)
    const [message, updateMessage] = useState(null)

    useEffect(() => {
        if (files != null) {
            if (files.length > 1) {
                updateFileLabel(`${files.length} Files`)
            }
            if (files.length === 1) {
                let name = `${files[0].name.substr(0, 15)}...`
                updateFileLabel(name)
            }
        } else {
            updateFileLabel("Choose File")
        }
    }, [files])

    const setFile = event => {
        updateFile(event.target.files)
    }
    const setEmail = event => {
        updateEmail(event.target.value)
    }
    const xClick = () => {
        updateFile(null)
        fileInput.value = ""
    }
    const clearMessage = () => {
        updateMessage("")
    }
    const validateSubmit = useCallback(() => {
        if (email === null) {
            updateMessage("Please enter your email.")
        } else if (
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ===
            false
        ) {
            updateMessage("Please enter a valid email.")
        } else if (files === null) {
            updateMessage("Please upload a photo or video.")
        } else {
            updateMessage(`This part doesn't work yet! U goof`)
            handleSubmit()
        }
    })

    const handleSubmit = async event => {
        updateMessage("Uploading...")
        const percent = 0
        let fileItems = []
        let currentItem=1
        for (let each of files) {
            console.log(each)
            //            let data = new FormData()
            //            data.append("files", each)

            const params = {
                Bucket: "scsf-matte", // pass your bucket name
                Key: "userContent/" + each.name, // file will be saved as scsf-matte/userContent/filename
                Body: each,
                ACL: "public-read"
            }
            let upload = await s3
                .upload(params, function(s3Err, each) {
                    if (s3Err) throw s3Err
                })
                .on("httpUploadProgress", function(evt) {
                    updateMessage(
                        "Uploading... " +
                            (Math.floor(parseInt((evt.loaded * 100) / evt.total) / files.length) * (currentItem)) +
                            "%"
                    )
                })
                .promise()

            fileItems.push(upload.Location)
            currentItem += 1
        }
        let allFiles=""
        for(let each of fileItems){
            allFiles = allFiles + "   \n \n   " + each
        }
        console.log(allFiles);
        console.log(fileItems);
        const userUpload = await axios({
            method: "POST",
            url: localURL + "user-uploads",
            data: {
                email: email,
                files: ""
            }
        })
        updateMessage("Uploaded!")
        props.updateCount(props.count + 1)
        updateFile(null)
    }

    return (
        <div className={props.className}>
            <form ref={div => (form = div)} className="flexbox">
                <div className="email">
                    <div className="labelContainer">
                        <input
                            ref={input => (emailText = input)}
                            onClick={clearMessage}
                            onChange={setEmail.bind(this)}
                            type="text"
                            placeholder="Enter Email"
                            className="emailText"
                        />
                    </div>
                </div>
                <div className={files ? "fileActive" : "file"}>
                    <input
                        ref={div => (fileInput = div)}
                        onClick={clearMessage}
                        onChange={setFile.bind(this)}
                        id="files"
                        type="file"
                        accept="video/*|image/*"
                        multiple
                    />
                    <div
                        ref={div => (fileBox = div)}
                        className="labelContainer"
                    >
                        <div className="label">{fileLabel}</div>
                    </div>
                    {files != null ? <X onClick={xClick} classname="x" /> : ""}
                </div>
                <div onClick={() => validateSubmit()} className="submit">
                    <div
                        ref={div => (submitBox = div)}
                        className="labelContainer"
                    >
                        <div className="label">Submit</div>
                    </div>
                </div>
                <Message text={message} className="message" />
            </form>
        </div>
    )
}

export default FormContainer
