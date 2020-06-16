import React from "react"
import {Link} from "gatsby";


const MobileMenuItem = props => {
    return (
        <li>
            <Link
              activeClassName = "active"
               to = {`/volume/${props.item.node.strapiId}`}>
                <span>Vol. {props.item.node.strapiId}</span>
                <span>{props.item.node.Title}</span>
            </Link>
        </li>
    )
}

export default MobileMenuItem;
