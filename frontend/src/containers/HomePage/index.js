import React, {useRef, useState, useEffect, useContext} from 'react'

import { setConfiguration } from 'react-grid-system';
import downCircleIcon from "../../assets/icons/icon-down-1.png"
import {useStyles} from './styles'

import Banner from 'components/Banner'
import UserInteraction from 'components/UserInteraction'
import ContactInfo from 'components/ContactInfo'
import { AppContext } from "context/appContext"


setConfiguration({ maxScreenClass: 'xxl' });

const HomePage = () => {

    const [nextRef, setNextRef] = useState()
    const [state, dispatch] = useContext(AppContext);
    const [hoverItem, setHoverItem] = useState(state.hoverItem.id)

    const classes = useStyles()

    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)

    const refIndexes = [ref1, ref2, ref3]

    useEffect(() => {
        setHoverItem(state.hoverItem.className)
    }, [state.hoverItem.className])

    useEffect(() => {
        updateRef()
    }, [])

    const setClass = (e) => {
        dispatch({
            type: "UPDATE_HOVER_ITEM",
            payload: {
                className: e.target.dataset.cursorid
            }
          })
    }

    const resetClass = () => {
        dispatch({
            type: "RESET_HOVER_ITEM",
            payload: {
                className: null
            }
          })
    }

    const updateRef = (ref = ref1) => {
        let currentRefIndex = refIndexes.indexOf(ref)
        let newRefIndex = currentRefIndex < 2 ? currentRefIndex+1 : 0
        setNextRef(refIndexes[newRefIndex])
    }

    const scrollDown = (nextRef) => {
        nextRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        updateRef(nextRef)
    }

    const moveCustomCursor = (e) => {

        document.getElementById("myCursor").setAttribute("style", `top: ${e.clientY + window.pageYOffset}px; left: ${e.clientX + window.pageXOffset}px`)

    }
    
    window.addEventListener("mousemove", moveCustomCursor)

    return (
        <div>
        <div id="myCursor" className={`${classes.cursor} ${classes[hoverItem]}`}/>
        <UserInteraction ref={ref2}/>
        <ContactInfo ref={ref3}/>
        <button 
            onClick={e => scrollDown(nextRef)} 
            className={classes.scrollButton}
        >
            <img 
            data-cursorid="cursorScrollButton"
            onMouseOver={setClass}
            onMouseLeave={resetClass}
            src={downCircleIcon} alt="" className={classes.downIcon}/>
        </button>
        </div>            
    
    )
}

export default HomePage
/**
 * <Banner ref={ref1}/>
 */