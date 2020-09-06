import React, {useContext, useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-grid-system';

import {useStyles} from './styles'
import { AppContext } from "context/appContext"

const Banner = (props, ref) => {

    const classes = useStyles()
    const [changingText, setChangingText] = useState("")
    const [, dispatch] = useContext(AppContext);

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

    useEffect(() => {
        getChangingText()
    }, [])

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    const getChangingText = async () => {
        let text = ["@NarendraModi", "#Football", "Coronavirus", "#JusticForSSR", "China", "@TikTok"]
        while(true){
            for(let wordIndex = 0; wordIndex < text.length; wordIndex ++){
                let index = 0
                for(;index<text[wordIndex].length;index++){
                    setChangingText(text[wordIndex].substr(0,index+1)+"|")
                    await sleep(50)
                }
                setChangingText(text[wordIndex].substr(0,index+1))
                await sleep(2000)
                for(;index>0;index--){
                    setChangingText(text[wordIndex].substr(0,index-1)+"|")
                    await sleep(50)
                }
                await sleep(2000)
            }
        }
        
    }


    return (
        <div className={classes.parent} ref={ref}>
        <Container fluid>
            <Row>
            <Col sm={12}>
                    <div 
                    className={classes.title} 
                    >
                        <span
                        data-cursorid="cursorTitle"
                        onMouseOver={setClass} 
                        onMouseLeave={resetClass}>
                        Read What Matters To <span className={classes.firstText}>You</span>
                        </span>
                    </div>
                    <div
                    className={classes.secondTextParent}>
                        <pre className={classes.changingText}>
                            {changingText}
                        </pre>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default React.forwardRef(Banner)
/**
 * <svg height="300" width="200">
                            <text x="0" y="15" fill="yellow" >Read What Matters</text>
                        </svg>

                        <span className={classes.secondText}>
                                Youter: Your Personal Twitter
                        </span>
 */
/**
 * <Col sm={12}>
                    <div 
                    className={classes.title} 
                    >
                        <span
                        data-cursorid="cursorTitle"
                        onMouseOver={setClass} 
                        onMouseLeave={resetClass}>
                        Read What Matters
                        </span>
                    </div>
                    <div>
                        Youter: Your Personal Twitter
                    </div>
                </Col>
                <animated.div style={propsOpacity}>Click To Begin</animated.div>
 */