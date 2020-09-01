import React from 'react';

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

