import React, {useRef, useState, useEffect} from 'react'

import { setConfiguration } from 'react-grid-system';
import downCircleIcon from "../../assets/icons/icon-down-1.png"
import {useStyles} from './styles'

import Banner from 'components/Banner'
import UserInput from 'components/UserInput'
import ContactInfo from 'components/ContactInfo'


setConfiguration({ maxScreenClass: 'xxl' });

const HomePage = () => {

    const classes = useStyles()

    const [nextRef, setNextRef] = useState()

    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)

    const refIndexes = [ref1, ref2, ref3]

    useEffect(() => {
        updateRef()
    }, [])

    const updateRef = (ref = ref1) => {
        let currentRefIndex = refIndexes.indexOf(ref)
        let newRefIndex = currentRefIndex < 2 ? currentRefIndex+1 : 0
        setNextRef(refIndexes[newRefIndex])
    }

    const scrollDown = () => {
        nextRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        updateRef(nextRef)
    }

    const moveCustomCursor = (e) => {

        document.getElementById("myCursor").setAttribute("style", `top: ${e.clientY + window.pageYOffset}px; left: ${e.clientX + window.pageXOffset}px`)

    }

    window.addEventListener("mousemove", moveCustomCursor)

    return (
        <div>
        <div id="myCursor" className={classes.cursor}/>
        <button onClick={e => scrollDown(nextRef)} className={classes.scrollButton}>
            <img src={downCircleIcon} alt="" className={classes.downIcon}/>
        </button>
        <Banner ref={ref1}/>
        <UserInput ref={ref2}/>
        <ContactInfo ref={ref3}/>
        </div>            
    
    )
}

export default HomePage
