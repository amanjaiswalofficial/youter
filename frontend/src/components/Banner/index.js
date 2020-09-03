import React, {useContext} from 'react';
import { Container, Row, Col } from 'react-grid-system';

import {useStyles} from './styles'
import { AppContext } from "context/appContext"

const Banner = (props, ref) => {

    const classes = useStyles()
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
                        Read What Matters
                        </span>
                    </div>
                    <div>
                        Youter: Your Personal Twitter
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default React.forwardRef(Banner)
