import React, { useRef } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import {useStyles} from './styles'

const UserInput = (props, ref) => {

    const classes = useStyles()

    return (
       <div ref={ref} className={classes.parent}>
           User Input Here
       </div>
    )
}

export default React.forwardRef(UserInput)

