export type SettingsState = {
    animation: {
        delay: number, 
        duration: number,
    },
    loader: {
        numberOfElements: number, 
        color: string,
        delay: number, 
        duration: number,
        timingFunction: string,
        animationDuration: number,
    }
}

export enum SettingsStateActions {

}

export const InitialSettingsState = {
    animation: {
        duration: 500,
        delay: 100,
    },
    loader: {
        numberOfElements: 5, 
        color: 'white',
        delay: 100, 
        duration: 500,
        timingFunction: 'cubic-bezier(.90, 0, .30, 1)',
        animationDuration: 800
    },
}

//props.numberOfElements*settings.duration 
// + ((0+(props.numberOfElements-1)*loaderSettings.delay)/2)*(props.numberOfElements-1)