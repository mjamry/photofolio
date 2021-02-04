import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useImageLoadingState } from '../state/AppState';
import { ImageLoadingStep } from '../state/ImageLoadingState';
import { Theme } from '../ThemeProvider';


type Props = UIProps & {
  imageSrc: string
};

type UIProps = {
  timingFunction: string,
  duration: string
};

const useStyles = makeStyles<Theme, Props>({
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  container: {
    height: '100%',
    width: '100%',
    clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
  },
  animationZoomIn: {
    animationName: '$zoomIn',
  },
  '@keyframes zoomIn': {
    from: {
      transform: 'scale(2.0)',
    },
    to: {
      transform: 'scale(1.0)',
    },
  },
  animationZoomOut: {
    animationName: '$zoomOut',
  },
  animation: (props) => ({
    animationDuration: props.duration,
    animationTimingFunction: props.timingFunction,
  }),
  '@keyframes zoomOut': {
    from: {
      transform: 'scale(1.0)',
    },
    to: {
      transform: 'scale(2.0)',
    },
  },
});

const ImageViewer = (props: Props) => {
  const { imageSrc } = props;
  const classes = useStyles(props);
  const imageRef = useRef<HTMLImageElement>(null);
  const [animationClass, setAnimationClass] = useState('');

  const imageLoading = useImageLoadingState();

  useEffect(() => {
    imageRef.current!.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    let animation = '';
    switch (imageLoading.currentStep) {
      case ImageLoadingStep.preLoading:
        animation = classes.animationZoomOut;
        break;
      case ImageLoadingStep.postLoading:
        animation = classes.animationZoomIn;
        break;
      default:
        break;
    }
    setAnimationClass(animation);
  }, [classes.animationZoomIn, classes.animationZoomOut, imageLoading.currentStep]);

  return (
    <div className={classes.container}>
      <img
        ref={imageRef}
        className={`${classes.image} ${classes.animation} ${animationClass}`}
        alt="Photography"
      />
    </div>
  );
};

export default ImageViewer;
