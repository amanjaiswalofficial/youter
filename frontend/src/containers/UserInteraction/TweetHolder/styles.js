import {createUseStyles} from 'react-jss'
import { COLORS } from 'colors'


export const useStyles = createUseStyles({
    parent: {
        marginTop:"2.5%",
        height: "350px",
        width: "650px", 
        overflowY: "auto",
        marginBottom: "7.5%",
        zIndex: "112",
        '&::-webkit-scrollbar': { width: 0, height: 0 },
        scrollbarWidth: "none",
        boxShadow: `0 0px 0px 0px ${COLORS.blue}, 0 0px 0px 0px ${COLORS.purple}, 1px 0 3px -4px ${COLORS.blue}, -1px 0 10px -4px ${COLORS.blue};`
    },
    selectedParent: {
        border: `1px solid ${COLORS.black}`
    },
    selected: {
        boxShadow: `0 0px 0px 0px ${COLORS.purple}, 0 0px 0px 0px ${COLORS.purple}, 1px 0 3px -4px ${COLORS.purple}, -1px 0 10px -4px ${COLORS.purple};`
    }
  })
