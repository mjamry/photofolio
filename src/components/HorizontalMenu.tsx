import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button/Button'
import { useImagesPathsSettingsState } from '../state/AppState'

const useStyles = makeStyles({
    container: {

    },
    horizontalMenu: {

    },
    verticatMenu: {

    }
})

export type Props = {
    handleSelected: (path: string) => void
}

const HorizontalMenu = (props: Props) => {
    const classes = useStyles()

    const imagesPaths = useImagesPathsSettingsState()
    
    return (
        <div className={classes.container}>
            <div className={classes.horizontalMenu}>
                <Button>About</Button>
                <Button>Contact</Button>

            </div>
            <div className={classes.verticatMenu}>
                <Button onClick={()=>props.handleSelected(imagesPaths.landscapes.default)}>Landscapes</Button>
                <Button onClick={()=>props.handleSelected(imagesPaths.people.default)}>People</Button>
            </div>
        </div>
    )
}

export default HorizontalMenu

