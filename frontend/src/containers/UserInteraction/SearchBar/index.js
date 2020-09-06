import React from 'react'
import { useState } from 'react'
import { Input } from '@rebass/forms'
import { Box, Button } from 'rebass'
import {useStyles} from './styles'
import { COLORS } from "colors"

export default function SearchBar({setClass, resetClass, handleClick}) {

    const [value, setValue] = useState("")
    const classes = useStyles()

    const updateSearch = () => {
        handleClick(value)
        setValue("")
    }

    return (
        <div className={classes.parent}>
            <div>
                <Box className={classes.boxInput}>
                    <Input
                        style={{cursor: "none", width: "100%", minWidth: "400px"}}
                        id='email'
                        type='text'
                        placeholder='Search Text Here'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                            />
                </Box>
                <Box className={classes.boxButton}>
                    <Button
                    data-cursorid="addButton"
                    onMouseOver={setClass}
                    onMouseLeave={resetClass} 
                    style={{
                        border: "1px solid black",
                        background: COLORS.white,
                        borderRadius: "0%",
                        cursor: "none",
                        width: "100px", 
                        color: "black", 
                        }}
                    variant='outline'
                    onClick={updateSearch}>
                        Add    
                    </Button>
                </Box>
            </div>
        </div>
    )
}
/**
 * 
 * 
        
 */