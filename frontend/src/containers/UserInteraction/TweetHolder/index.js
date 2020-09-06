import React, {useState} from 'react'

import Tweet from "components/Tweet"
import {useStyles} from './styles'


const TweetHolder = ({tweets}) => {

    const classes = useStyles()
    const [selected, setSelected] = useState(null)
    return (
        <div
            className={`${classes.parent} ${selected === true ? classes.selected : null}`}
            onMouseEnter={e => setSelected(true)}
            onMouseLeave={e => setSelected(false)}
        >
            {
            tweets.map((tweet) => {return <Tweet data={tweet}/>})
            }
        </div>
    )
}

export default TweetHolder
