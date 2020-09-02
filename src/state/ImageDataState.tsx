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

export type ImageDTO = {
    name: string,
    descriptipon: string,
    thumbnailLink: string,
    webContentLink: string,
    imageMediaMetadata: ImageMetadataDTO,
}

export type ImageDataState = {
    imagesData: ImageDTO[],
    currentImageIndex: number
}

export const ImageDataStateActions = {
    setImageData: 'setImageData',
    setCurrentIndex: 'setCurrentIndex',
}
