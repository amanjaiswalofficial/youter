import React, {useState, useContext} from 'react';
import { Input } from '@rebass/forms'
import { Box, Button } from 'rebass'
import { AppContext } from "context/appContext"


import {useStyles} from './styles'
import {sendData} from "utils/helperFunctions"

const UserInteraction = (props, ref) => {

    const [value, setValue] = useState("")
    const [tags, setTags] = useState([])
    const [, dispatch] = useContext(AppContext);

    const classes = useStyles()
    
    const handleClick = async () => {
        let statusCode = await sendData(value, "add")
        if(statusCode === 200){
            setTags([...tags, value])
        }
    }

    const removeTag = async (tagToRemove) => {
        let remainingTags = []
        let statusCode = await sendData(value, "remove")
        if(statusCode === 200){
            remainingTags = tags.filter((singleTag) => {
                return singleTag != tagToRemove
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
       </div>
    )
}

export default React.forwardRef(UserInteraction)
