import { SettingsState, SettingsStateActions } from "./SettingsState"
import { ImageLoadingState, ImageLoadingStateActions } from "./ImageLoadingState"

//APP STATE
export type AppState = {
    settings: SettingsState,
    imageLoading: ImageLoadingState,
}

export type AppDispatch = (action: AppStateReducerAction) => void

export type AppStateReducerAction = {
    type: SettingsStateActions | ImageLoadingStateActions, 
    payload: any
}