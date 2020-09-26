export type ImageMetadataDTO = {
    exposureTime: number,
    focalLength: number,
    isoSpeed: number,
    aperture: number,
    height: number,
    width: number,
    lens: string,
    time: string,
}

export const FileMimeTypes = {
    images: {
        png: "image/png",
    },
    json: "application/json",
    folder: "application/vnd.google-apps.folder",
}

enum ThemeType { 
    light,
    dark
}

export type ImageDataDTO = {
    id: string,
    name: string,
    mimeType: string,
    webContentLink: string,
    hasThumbnail: boolean,
}

export type ImageDTO = ImageDataDTO & ImagesDetailsDTO

export type ImagesDetailsDTO = {
    theme: string,
    name: string,
}

export type ImageDataState = {
    imagesData: ImageDTO[],
    currentImageIndex: number
}

export const ImageDataStateActions = {
    setImageData: 'setImageData',
    setCurrentIndex: 'setCurrentIndex',
}
