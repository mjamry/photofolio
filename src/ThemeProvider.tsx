import React, { useState, useEffect } from 'react'
import {createMuiTheme,ThemeProvider as MaterialThemeProvider} from '@material-ui/core/styles'
import { useImageDataState } from './state/AppState';
import { ThemeType } from './state/ImageDataState';

export type Theme = {
    palette: {
        primary: {
            main: string
        },
        secondary: {
            main: string
        }
    }
}

type Props = {
    children: React.ReactNode | React.ReactNode[]
}

const lightTheme: Theme = createMuiTheme({
	palette: {
		primary: {
			main: '#aaddbb'
		},
		secondary: {
			main: '#fff'
		}
	}
  });

const darkTheme: Theme = createMuiTheme({
	palette: {
		primary: {
			main: '#005511'
		},
		secondary: {
			main: '#fff'
		}
	}
})

const ThemeProvider = ({children}: Props) => {
    const [theme, setTheme] = useState<Theme>(lightTheme)
    const imageState = useImageDataState()

    useEffect(() => {
        setTheme(imageState.uiTheme === ThemeType.dark ? darkTheme : lightTheme)
    }, [imageState.uiTheme])

    return (
        <MaterialThemeProvider theme={theme}>
            {children}
        </MaterialThemeProvider>
    )
}

export default ThemeProvider