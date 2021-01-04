import React, { createContext, useContext, useReducer } from 'react';
import { AppState, AppStateReducerAction, AppDispatch } from './StateTypes';
import { ImageLoadingStep, ImageLoadingState, ImageLoadingStateActions } from './ImageLoadingState';
import { SettingsState, InitialSettingsState } from './SettingsState';
import { ImageDataState, ImageDataStateActions, ThemeType } from './ImageDataState';

type Props = {
  children: React.ReactNode,
};

const initialState: AppState = {
  settings: InitialSettingsState,
  imageLoading: {
    currentStep: ImageLoadingStep.none,
  },
  imageData: {
    currentImageIndex: 0,
    imagesData: [],
    uiTheme: ThemeType.light,
  },
};

// REDUCERS

const animationReducer = (state: ImageLoadingState, action: AppStateReducerAction) => {
  switch (action.type) {
    case ImageLoadingStateActions.setStep:
      return { ...state, currentStep: action.payload };
    default:
      return state;
  }
};

const settingsReducer = (state: SettingsState, action: AppStateReducerAction) => state;

const imageDataReducer = (state: ImageDataState, action: AppStateReducerAction) => {
  switch (action.type) {
    case ImageDataStateActions.setCurrentIndex:
      return { ...state, currentImageIndex: action.payload };
    case ImageDataStateActions.setImageData:
      return { ...state, imagesData: action.payload };
    case ImageDataStateActions.setUiTheme:
      return { ...state, uiTheme: action.payload };
    default:
      return state;
  }
};

const reducer = (state: AppState, action: AppStateReducerAction) => ({
  imageLoading: animationReducer(state.imageLoading, action),
  settings: settingsReducer(state.settings, action),
  imageData: imageDataReducer(state.imageData, action),
});

// PROVIDER
const AppStateContext = createContext<AppState | undefined>(undefined);
const AppDispatchContext = createContext<AppDispatch | undefined>(undefined);

const AppStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
};

// SELECTORS
export {
  useImageLoadingState,
  useSettingsState,
  useLoaderSettingsState,
  useImageViewerSettings,
  useImageDataState,
  useGapiClientSettingsState,
  useImagesPathsSettingsState,
  useImageIndicatorSettings,
};

const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('AppStateContext must be used with provider');
  }

  return context;
};

const useImageDataState = () => useAppState().imageData;

const useImageLoadingState = () => useAppState().imageLoading;

const useSettingsState = () => useAppState().settings;

const useLoaderSettingsState = () => useAppState().settings.loader;

const useGapiClientSettingsState = () => useAppState().settings.gapiClient;

const useImagesPathsSettingsState = () => useAppState().settings.imagesPaths;

const useImageViewerSettings = () => useAppState().settings.imageViewer;

const useImageIndicatorSettings = () => useAppState().settings.imageIndicator;

const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('AppDispatchContext must be used with provider');
  }

  return context;
};

export { AppStateProvider, useAppDispatch };
