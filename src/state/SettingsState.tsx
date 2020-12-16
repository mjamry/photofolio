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
    },
    imageIndicator: ImageIndicatorSettingsState,
}

export type LoaderSettingsState = 
{
    numberOfElements: number, 
    delay: number, 
    duration: number,
    timingFunction: string,
    animationTimeout: number,
}

export type ImageIndicatorSettingsState = {
    stripeWidth: string,
    stripeHeight: string,
    activeStripeWidth: string,
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
        fields: 'files(id,name,mimeType,webContentLink,hasThumbnail)'
    },

    imagesPaths: {
        landscapes: {
            default: '1cUV01b_dhLFTnN0ZRhWoQWP0rmqU0fd5'
        },
        people: {
            default: '1za6v4vAunRmoSj04WYyPrsPtWXGwhU9M'
        }
    },

    imageIndicator: {
        stripeWidth: '50px',
        stripeHeight: '20px',
        activeStripeWidth: '75px',
    }
}