import React, {useState} from "react"

import {useStyles} from "./styles.js"

const Tags = ({tags, removeTag}) => {

    const classes = useStyles()

    const getClassName = (tag) => {
        let type = tag.substr(0,1)
        switch(type){
            case("@"):
            return classes.userName
            case("#"):
            return classes.hashTag
            default:
            return classes.defaultText
        }
    }

    return (
        <div className={classes.parent}>
            <div className={classes.tag}>
                Your Are Looking For: {tags.map((tag) => {
                return (
                    <span className={getClassName(tag)} onClick={e => removeTag(tag)}>&nbsp;&nbsp;&nbsp;{tag} </span>
                    )
                })}
            </div>
        </div>
    )
}

export default Tags
