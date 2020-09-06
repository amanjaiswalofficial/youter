import React, {useState, useContext, useEffect} from 'react';


import { AppContext } from "context/appContext"
import {socket} from "App"


import {useStyles} from './styles'
import {sendData, getData} from "utils/helperFunctions"
import SearchBar from "./SearchBar"
import Tags from "./Tags"
import TweetHolder from "./TweetHolder"

const UserInteraction = (props, ref) => {

    const [tags, setTags] = useState([])
    const [tweets, setTweets] = useState([])
    const [, dispatch] = useContext(AppContext);

    const classes = useStyles()
    
    useEffect(() => {
        getTweets()
    }, [])


    useEffect(() => {
    socket.on("new_tweets", data  => {
        setTweets([])
        setTweets(data.tweets)
        })
    }, [])

    const getTweets = async () => {
        // TO CHANGE
        let data = await getData("tweets")
        if(data.code === 200){
            setTweets(data.response)
        }
    }

    const handleClick = async (value) => {
        let data = await sendData(value, "add")
        if(data.code === 200){
            setTags([...tags, value])
        }
    }

    const removeTag = async (tagToRemove) => {
        let remainingTags = []
        let data = await sendData(tagToRemove, "remove")
        if(data.code === 200){
            remainingTags = tags.filter((singleTag) => {
                return singleTag !== tagToRemove
            })
        setTags(remainingTags)
        }
    }

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
       <div ref={ref} className={classes.parent}>
            <SearchBar 
            setClass={setClass} 
            resetClass={resetClass} 
            handleClick={handleClick}/>
            <Tags tags={tags} removeTag={removeTag}/>
            <TweetHolder tweets={tweets}/>
       </div>
    )
}

export default React.forwardRef(UserInteraction)
/**
 *  
 */