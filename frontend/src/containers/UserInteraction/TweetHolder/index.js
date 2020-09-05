import React, {useEffect} from 'react'

import Tweet from "components/Tweet"

const TweetHolder = ({tweets}) => {


    return (
        <div>
        <div style={{
        width: "40%", 
        height: "450px",
        overflowY: "scroll",
        boxShadow: "10px 0px 4px -10px rgba(31, 73, 125, 0.8), -10px 0 4px -10px rgba(31, 73, 125, 0.8)"}}>
            {tweets.map((tweet) => {
                return <Tweet data={tweet}/>
            })}
        </div>
        </div>
    )
}

export default TweetHolder
