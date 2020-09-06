import {createUseStyles} from 'react-jss'
import { COLORS } from "colors"

export const useStyles = createUseStyles({
    parent: {
        width: "100%", 
        minHeight: "130px",
        paddingLeft: "20px",
        paddingRight: "20px",
        display: "grid",
        alignContent: "center"
    },
    firstRow: {
        verticalAlign: "top"
    },
    name: {
        color: COLORS.black,
        fontFamily: "nexa-bold",
        fontSize: "18px"
    },
    secondRow:{
        fontFamily: "frutigue-light",
        fontSize: "18px",
        lineHeight: 1.2,
    },
    userName: {
        border: "none",
        background: "none",
        fontSize: "18px",
        fontFamily: "nexa-light",
        color: COLORS.black,
        "&:hover": {
            fontFamily: "nexa-bold",
            color: COLORS.blue
        }
    },
    readMoreButton:{
        border: "none", 
        background: "none", 
        cursor: "none"
    }
  })
