import { useAppDispatch, useGapiClientSettingsState } from "../state/AppState";
import { ImageDataStateActions, ImageDTO, ImagesDetailsDTO, ImageDataDTO, FileMimeTypes } from "../state/ImageDataState";

window.gapi = window.gapi || {};
declare global {
    interface Window { gapi: any; }
}

export type ImagesDataProvider = {
    initialize: () => void,
    fetchImagesData: (locationId: string) => void,
}

export const useImagesDataProvider = (): ImagesDataProvider => {
    const dispatchState = useAppDispatch()
    const settings = useGapiClientSettingsState()
    const helper = useDataProviderHelper()

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

    const fetchImagesData = async (locationId: string): Promise<void> => {
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
            const data = response.result.files as ImageDataDTO[]
            console.log(data)
            
            const details = await helper.getDetails(data)
            console.log(details)
            const images = await helper.getImagesDataWithDetails(data, details)
            console.log(images)

            dispatchState({type: ImageDataStateActions.setImageData, payload: images});
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

const useDataProviderHelper = () => {
    const getDetails = async (data: ImageDataDTO[]): Promise<ImagesDetailsDTO[]> => {
        if(!gapi.client){
            console.log('GAPI client not yet initialized')
            return []
        }

        const detailsFile = data.find(d => d.mimeType == FileMimeTypes.json)
        const details = await gapi.client.drive.files.get({
            fileId: detailsFile?.id || '',
            alt: 'media',
        })

        return details.result as ImagesDetailsDTO[]
    }

    const getImagesDataWithDetails = (data: ImageDataDTO[], details: ImagesDetailsDTO[]): ImageDTO[] => {
        return data.reduce<ImageDTO[]>((result, img) => {
            const imgDetails = details.find(i => i.name == img.name)
            if(imgDetails){
                console.log({...img, ...imgDetails})
                result.push({...img, ...imgDetails})
            }
            
            return result
        }, [])
    }

    return {
        getDetails: getDetails,
        getImagesDataWithDetails: getImagesDataWithDetails
    }
}