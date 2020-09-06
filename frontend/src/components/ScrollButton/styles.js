import {createUseStyles} from 'react-jss'
import { COLORS } from 'colors'


export const useStyles = createUseStyles({
    parent: {
        scrollBehavior: "smooth",
    },
    downIconParent: {
        border: "1px solid black",
        display: "block",
        marginLeft: "auto",
        marginTop: "auto",
        
    },
    downIcon: {
        height: "64px",
        width: "64px",
    },
    scrollButton: {
        position: "fixed",
        zIndex: "111",
        top:"85%",
        left: "46%",
        background: "none",
        border: "none",
        outline: "none !important",
        outlineOffset: "none !important",
        "&:hover": {
            cursor: "none"
        }
    }
  })
