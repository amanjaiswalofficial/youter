import React, {useRef, useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-grid-system';

import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'

import { setConfiguration } from 'react-grid-system';
import downCircleIcon from "../../assets/icons/icon-down-1.png"
import {useStyles} from './styles'

import Banner from 'components/Banner'
import UserInput from 'components/UserInput'
import ContactInfo from 'components/ContactInfo'


setConfiguration({ maxScreenClass: 'xxl' });

//const [nowRef, setNowRef] = useState()
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

const HomePage = () => {

    const classes = useStyles()

    const [nextRef, setNextRef] = useState()
    const [cursorCoord, setCursorCoord] = useState({x: "0px", y: "0px"})


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

        let element = document.getElementById("myCursor")
        element.style.top = e.clientY+"px"
        element.style.left = e.clientX+"px"

    }

    window.addEventListener("mousemove", moveCustomCursor)

    return (
        <div>
        <button onClick={e => scrollDown(nextRef)} className={classes.scrollButton}>
            <img src={downCircleIcon} alt="" className={classes.downIcon}/>
        </button>
        <Container fluid>
            <Row>
                <Banner ref={ref1}/>
            </Row>
            <Row>
                <UserInput ref={ref2}/>
            </Row>
            <Row>
                <ContactInfo ref={ref3}/>
            </Row>
        </Container>
        <div id="myCursor" className={classes.cursor}/>
        </div>            
    
    )
}

export default HomePage

/**
 * 
 */