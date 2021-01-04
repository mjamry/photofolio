import { SettingsState } from './SettingsState';
import { ImageLoadingState } from './ImageLoadingState';
import { ImageDataState } from './ImageDataState';

// APP STATE
export type AppState = {
  settings: SettingsState,
  imageLoading: ImageLoadingState,
  imageData: ImageDataState,
};

export type AppDispatch = (action: AppStateReducerAction) => void;

export type AppStateReducerAction = {
  type: string,
  payload: any
};
