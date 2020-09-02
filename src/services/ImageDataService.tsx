import { useAppDispatch, useGapiClientSettingsState } from "../state/AppState";
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
    const settings = useGapiClientSettingsState()

    const initialize = async (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            gapi.load('client', () => {
                gapi.client
                    .init({
                        'apiKey': settings.apiKey,
                        'discoveryDocs': settings.discoveryDocs,
                        'scope': settings.scope,
                        'clientId': settings.clientId,
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
        if(!gapi.client){
            console.log('GAPI client not yet initialized')
            return
        }

        const response = await gapi.client.drive.files.list({
            "q": `'${locationId}' in parents`,
            "fields": settings.fields
        });

        if(response.status === 200) 
        {
            const imagesData = response.result.files as ImageDTO[]
            dispatchState({type: ImageDataStateActions.setImageData, payload: imagesData});
            console.log(imagesData);
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