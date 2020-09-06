import {createUseStyles} from 'react-jss'
import { COLORS } from '../../colors'

export const useStyles = createUseStyles({
    parent: {
        height: "100%",
        minHeight: "570px",
        width: "100%",
        background: COLORS.blue,
        alignItems: "center"
    },
    title: {
        marginTop: "5%",
        color: COLORS.white,
        fontWeight: "bold",
        lineHeight: 0.8,
        fontFamily: "nexa-bold",
        fontSize: "13vw",
    },
    secondTextParent:{
        display: "grid",
        //justifyContent: "center"
    },
    changingText: {
        fontSize: "2.5vw",
        fontFamily: "nexa-light",
        transition: "ease",
        color: COLORS.black,
        transitionDelay: "1s"
    },
    firstText: {
        color: COLORS.black
    }
  })
  /**
   * "&:hover + $child"
   */
