import {createUseStyles} from 'react-jss'
import { COLORS } from '../../colors'

export const useStyles = createUseStyles({
    parent: {
        height: "100vh",
        width: "100vw",
        background: COLORS.white,
        alignItems: "center"
    },
    input: {
        border: '1px solid yellow'
    }
  })
