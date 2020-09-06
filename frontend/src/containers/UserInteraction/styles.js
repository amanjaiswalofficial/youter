import {createUseStyles} from 'react-jss'
import { COLORS } from '../../colors'

export const useStyles = createUseStyles({
    parent: {
        height: "100%",
        width: "100%",
        background: COLORS.white,
        display: "grid",
        justifyContent:"center"
    }
  })
