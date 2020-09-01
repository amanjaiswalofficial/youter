import React from 'react';
import { Container, Row, Col } from 'react-grid-system';

import {useStyles} from './styles'

const Banner = (props, ref) => {

    const classes = useStyles()

    return (
        <div className={classes.parent} ref={ref}>
        <Container fluid>
            <Row>
                <Col sm={12}>
                    <div className={classes.title}>
                        Read What Matters
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default React.forwardRef(Banner)
