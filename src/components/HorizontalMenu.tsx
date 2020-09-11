import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button/Button'
import { useImagesPathsSettingsState } from '../state/AppState'

const useStyles = makeStyles({
    horizontalMenu: {
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0, 0, 0, .25)',
        height: '30px',
        padding: '10px',
    },
    leftMenu: {
    },
    rightMenu: {
    }
})

export type Props = {
    handleSelected: (path: string) => void
}

const HorizontalMenu = (props: Props) => {
    const classes = useStyles()

    const imagesPaths = useImagesPathsSettingsState()
    
    return (
        <div className={classes.horizontalMenu}>
            <div className={classes.leftMenu}>
                <Button onClick={()=>props.handleSelected(imagesPaths.landscapes.default)}>Landscapes</Button>
                <Button onClick={()=>props.handleSelected(imagesPaths.people.default)}>People</Button>
            </div>
            <div className={classes.rightMenu}>
                <Button>About</Button>
                <Button>Contact</Button>

            </div>

        </div>
    )
}

export default HorizontalMenu

