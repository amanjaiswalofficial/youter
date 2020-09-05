import {createUseStyles} from 'react-jss'
import { COLORS } from '../../colors'

export const useStyles = createUseStyles({
    parent: {
        height: "100vh",
        width: "100vw",
        background: COLORS.blue,
        alignItems: "center"
    },
    title: {
        marginTop: "10%",
        color: COLORS.white,
        fontWeight: "bold",
        lineHeight: 0.8,
        fontFamily: "nexa-bold",
        fontSize: "15vw",
    }
  })
  /**
   * "&:hover + $child"
   */
