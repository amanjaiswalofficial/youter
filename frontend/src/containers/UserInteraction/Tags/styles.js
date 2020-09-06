import {createUseStyles} from 'react-jss'
import { COLORS } from "colors"

export const useStyles = createUseStyles({
    parent: {
      marginBottom: "2.5%",
      display: "grid",
      justifyContent: "center"
    },
    tag: {
      width: "100%",
      minWidth: "500px",
      fontFamily: "frutigue-light"
    },
    hashTag:{
      fontSize: "20px",
      color: COLORS.blue,
      fontFamily: "nexa-bold"
    },
    userName: {
      fontSize: "20px",
      color: COLORS.purple,
      fontFamily: "nexa-bold"
    },
    defaultText: {
      fontSize: "20px",
      fontFamily: "nexa-light"
    }
  })
