import { useAppDispatch } from "../state/AppState";
import { ImageDataStateActions, ImageDTO } from "../state/ImageDataState";

window.gapi = window.gapi || {};
declare global {
    interface Window { gapi: any; }
}

export type ImageDataService = {
    initialize: () => void,
    fetchImagesData: (locationId: string) => void,
}

export const useImageDataService = (): ImageDataService => {
    const dispatchState = useAppDispatch()

    const initialize = async (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            gapi.load('client', () => {
                gapi.client
                    .init({
                        'apiKey': 'AIzaSyDwJ7EKjHmTfy44hQMbvR5HEdMgkUjn2fw',
                        'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
                        'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                        'clientId': '663092351374-h370k8odhj2gtcd5rrp1qo8mkcs9gkvr.apps.googleusercontent.com'
                    })
                    .then(() => {
                        resolve()
                    })
                    .catch((error: any) => {
                        console.log(error)
                        reject()
                    })
            });
        })
    }

    const fetchImagesData = async (locationId: string) => {
        const response = await gapi.client.drive.files.list({
            "q": "'0B6Fw2L7BBXZTQUQtOUZrLWF2TWc' in parents",
            "fields": 'files(*)'
        });

        if(response.status === 200) 
        {
            const imagesData = response.result.files as ImageDTO[]
            dispatchState({type: ImageDataStateActions.setImageData, payload: imagesData});
        }
        else
        {
            console.log(response)
            throw new Error(response.statusText)
        }
    }

    return {
        initialize: initialize,
        fetchImagesData: fetchImagesData,
    }
}