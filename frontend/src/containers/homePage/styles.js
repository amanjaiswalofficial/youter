import {createUseStyles} from 'react-jss'
import { COLORS } from '../../colors'

export const useStyles = createUseStyles({
    twitter: {
        display: "inline",
        textAlign: "center",
        color: COLORS.blue,
        fontSize: "60px",
        "&:hover": {
            color: COLORS.purple
        }
    }
  })
