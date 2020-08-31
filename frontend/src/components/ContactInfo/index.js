import React, { useRef } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import {useStyles} from './styles'

const Banner = (props, ref) => {

    const classes = useStyles()

    return (
        <div className={classes.parent} ref={ref}>
        <Container fluid>
            <Row>
                Contact Info Here
            </Row>
        </Container>
        </div>
    )
}

export default React.forwardRef(Banner)

