import React from 'react'

import {useStyles} from "./styles.js"

const Tweet = ({data}) => {


    const textToDisplay = () => {
        // let restOfWords = 140 - data.text.length
        // let extraWords = "Friendship contrasted solicitude insipidity in introduced literature it. He seemed denote except as oppose do spring my. Between any may mention evening age shortly can ability regular. He shortly sixteen of colonel colonel evening cordial to. Although jointure an my of mistress"
        // let newTweet =  data.text+extraWords.substr(0, restOfWords)
        let tweetLength = data.text.length
        if(!tweetLength >= 200){
            let newTweet = data.text.substr(0, 140).split(" ")
            newTweet.pop(newTweet.length)
            newTweet = newTweet.join(" ")
            return newTweet
        }
        return data.text

    }

    const classes = useStyles()

    return (
        <div 
        className={classes.parent}>
            <div className={classes.firstRow}>
                <span className={classes.name}>{data.name}</span>
                &nbsp;&nbsp;(<a href={`https://twitter.com/${data["username"]}`} 
                target="_blank" 
                rel="noopener noreferrer" className={classes.userName}>@{data.username}</a>)
            </div>
            <div className={classes.secondRow}>
                {textToDisplay()}
                <a 
                href={`https://twitter.com/twitter/statuses/${data["id_str"]}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={classes.readMoreButton}>..Read Full Tweet</a>
            </div>
        </div>
    )
}

export default Tweet
/**
 <ParallaxLayer 
            offset={index} 
            speed={0.5}>
                <div 
                style={{
                    width: "100%", 
                    minHeight: "150px", 
                    border: "1px solid yellow"
                    }}
                onClick={() => handleClick(index)}
                    >
                    <div>
                    <img src={data["profile_image_url"]} alt=""/>
                    {data.name}{data["received_at"]}
                    </div>
                    <div>
                        {textToDisplay()}
                    </div>
                </div>
        </ParallaxLayer>
 */
