export type SettingsState = 
{
    loader: LoaderSettingsState,
    imageViewer: {
        duration: number,
        timingFunction: string,
        height: string,
        width: string
    }
}

export type LoaderSettingsState = 
{
    numberOfElements: number, 
    color: string,
    delay: number, 
    duration: number,
    timingFunction: string,
    animationTimeout: number,
}

export enum SettingsStateActions {

}

const Constants = {
    loader: {
        numberOfElements: 5,
        durationInMs: 500,
        delayInMs: 100,
    },
    imageViewer: {
        height: 80,
        ratio: 1.5
    }
}
 
export const InitialSettingsState: SettingsState = 
{
    loader: {
        numberOfElements: Constants.loader.numberOfElements, 
        color: 'white',
        delay: Constants.loader.delayInMs, 
        duration: Constants.loader.durationInMs,
        timingFunction: 'cubic-bezier(.90, 0, .30, 1)',
        animationTimeout: ((0 + (Constants.loader.numberOfElements - 1) * Constants.loader.delayInMs / 2) * (Constants.loader.numberOfElements - 1))
    },

    imageViewer: {
        duration: 700,
        timingFunction: 'cubic-bezier(.90, 0, .30, 1)',
        height: `${Constants.imageViewer.height}vh`,
        width: `calc(${Constants.imageViewer.height}vh * ${Constants.imageViewer.ratio})`
    }
}