import React, {useState, useContext, useEffect} from 'react';
import { Input } from '@rebass/forms'
import { Box, Button } from 'rebass'
import { AppContext } from "context/appContext"
import {socket} from "App"


import {useStyles} from './styles'
import {sendData, getData} from "utils/helperFunctions"
import TweetHolder from "./TweetHolder"

const UserInteraction = (props, ref) => {

    const [value, setValue] = useState("")
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

    const handleClick = async () => {
        let data = await sendData(value, "add")
        if(data.code === 200){
            setTags([...tags, value])
        }
    }

    const removeTag = async (tagToRemove) => {
        let remainingTags = []
        let data = await sendData(value, "remove")
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
        <Box width={"40%"}>
        <Input
        style={{border: "1px solid green", cursor: "none"}}
            id='email'
            type='text'
            placeholder='Search Text Here'
            onChange={e => setValue(e.target.value)}
        />
        </Box>
        <Button 
        style={{background: "white",
                borderRadius: "0%", 
                border: "1px solid green",
                cursor: "none", 
                color: "black"}} 
        variant='outline' 
        mr={2}
        data-cursorid="addButton"
        onMouseOver={setClass}
        onMouseLeave={resetClass}
        onClick={handleClick}>
        Add
        </Button>
        Your Tags: {tags.map((tag) => {
            return <span onClick={e => removeTag(tag)}>{tag} </span>
        })}
        {tweets.length > 0 ? <TweetHolder tweets={tweets}/> : null}
       </div>
    )
}

export default React.forwardRef(UserInteraction)
