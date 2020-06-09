import React from "react"
import TransitionLink from "gatsby-plugin-transition-link";


const MobileMenuItem = props => {
    return (
        <li>
            <TransitionLink
                to={`/volume/${props.item.node.strapiId}`}
                activeClassName="active"
                exit={{
                    length: 3,
                    trigger: props.close(),
                }}
                entry={{
                    delay: 0,
                }}
            >
                <span>Vol. {props.item.node.strapiId}</span>
                <span>{props.item.node.Title}</span>
            </TransitionLink>
        </li>
    )
}

export default MobileMenuItem;
