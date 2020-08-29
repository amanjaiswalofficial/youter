import React from 'react'
import icon from "../../assets/icons/logo-twitter.svg"
import {useStyles} from './styles'

const HomePage = () => {
    
    const classes = useStyles()

    return (
            <div className={classes.twitter}>
                <ion-icon src={icon}></ion-icon>
            </div>
    )
}

export default HomePage