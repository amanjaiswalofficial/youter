import {createUseStyles} from 'react-jss'
import { COLORS } from '../../colors'

export const useStyles = createUseStyles({
    parent: {
        scrollBehavior: "smooth"
    },
    downIconParent: {
        border: "1px solid black",
        display: "block",
        marginLeft: "auto",
        marginTop: "auto"
        
    },
    downIcon: {
        height: "64px",
        width: "64px"
    },
    root: {
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
        border: 0
    },
    cursor: {
        width: "1em",
        height: "1em",
        border: "1px solid black",
        borderRadius:"50%",
        position: "absolute",
        transition: "0.1s",
        transform: "translate(-50%, -50%)",
        zIndex: "113",
        pointerEvents: "none"
    }
  })
