import React, {useState} from "react"

import downCircleIcon from "assets/icons/icon-down-1.png"
import downCircleIconBlue from "assets/icons/icon-down-blue.png"
import {useStyles} from './styles'

const ScrollButton = ({currentRef, handleClick, setClass, resetClass}) => {

    const classes = useStyles()
    const [hover, setHover] = useState(false)

    const updateSource = (e) => {
        if(!hover){
            setClass(e)
            setHover(true)
        }
        else{
            resetClass(e)
            setHover(false)
        }
    }

    return (
    <button 
        onClick={handleClick} 
        className={classes.scrollButton}
    >
        <img 
        data-cursorid="cursorScrollButton"
        onMouseOver={updateSource}
        onMouseLeave={updateSource}
        src={hover ? downCircleIconBlue : downCircleIcon} alt="" className={classes.downIcon}/>
    </button>
    )
}

export default ScrollButton
