import {createUseStyles} from 'react-jss'
import { COLORS } from "colors"

export const useStyles = createUseStyles({
    parent: {
        marginTop: "5%",
        marginBottom: "2.5%",
        display: "grid",
        justifyContent: "center"
    },
    boxInput: {
        float: "left"
    },
    boxButton: {
        float: "left"
    },
    button: {
        border: "1px solid red",
        background: COLORS.white,
        borderRadius: "0%",
        cursor: "none",
        width: "100px", 
        color: "black", 
        float: "left"
    },
    icon: {
        width: "100%", 
        padding: "0px", 
        margin: "0px"
    }
  })
