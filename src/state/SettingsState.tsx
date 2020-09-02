export type SettingsState = 
{
    loader: LoaderSettingsState,
    imageViewer: {
        duration: number,
        timingFunction: string,
        height: string,
        width: string
    },
    gapiClient: {
        apiKey: string,
        clientId: string,
        discoveryDocs: [string],
        scope: string,
        fields: string,
    },
    imagesPaths: {
        landscapes: {
            default: string,
        },
        people: {
            default: string,
        }
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

export const SettingsStateActions = {

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
    },

    gapiClient: {
        apiKey: 'AIzaSyDwJ7EKjHmTfy44hQMbvR5HEdMgkUjn2fw',
        clientId: '663092351374-h370k8odhj2gtcd5rrp1qo8mkcs9gkvr.apps.googleusercontent.com',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
        fields: 'files(*)'
    },

    imagesPaths: {
        landscapes: {
            default: '11aXiiC9918ShCainZ4JQzTJLjlfHJPtJ'
        },
        people: {
            default: '0B6Fw2L7BBXZTQUQtOUZrLWF2TWc'
        }
    }
}