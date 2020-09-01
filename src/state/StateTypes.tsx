import { SettingsState, SettingsStateActions } from "./SettingsState"
import { AnimationState, AnimationStateActions } from "./AnimationState"

//APP STATE
export type AppState = {
    settings: SettingsState,
    animation: AnimationState,
}

export type AppDispatch = (action: AppStateReducerAction) => void

export type AppStateReducerAction = {
    type: SettingsStateActions | AnimationStateActions, 
    payload: any
}