import { SettingsState, SettingsStateActions } from "./SettingsState"
import { ImageLoadingState, ImageLoadingStateActions } from "./ImageLoadingState"
import { ImageDataStateActions, ImageDataState } from "./ImageDataState"

//APP STATE
export type AppState = {
    settings: SettingsState,
    imageLoading: ImageLoadingState,
    imageData: ImageDataState,
}

export type AppDispatch = (action: AppStateReducerAction) => void

export type AppStateReducerAction = {
    type: string, 
    payload: any
}