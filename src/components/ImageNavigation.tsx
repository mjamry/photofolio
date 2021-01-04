import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { IconButton } from '@material-ui/core';
import { useImageLoadingState } from '../state/AppState';
import { ImageLoadingStep } from '../state/ImageLoadingState';
import { Theme } from '../ThemeProvider';

export type Props = {
  currentItemIndex: number,
  numberOfItems: number,
  next: () => void,
  before: () => void,
};

const useStyles = makeStyles((theme: Theme) => ({
  navigationContainer: {
    display: 'flex',
    flexFlow: 'row',
  },
  button: {
    color: theme.palette.primary.main,
  },
}));

const ImageNavigation = (props: Props) => {
  const classes = useStyles();

  const imageLoading = useImageLoadingState();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    switch (imageLoading.currentStep) {
      case ImageLoadingStep.none:
        setIsActive(true);
        break;
      default:
        setIsActive(false);
        break;
    }
  }, [imageLoading.currentStep]);

  const renderNext = () => {
    const isDisabled = !(props.currentItemIndex < props.numberOfItems - 1) || !isActive;

    return (
      <IconButton
        className={classes.button}
        onClick={props.next}
        disabled={isDisabled}
      >
        <NavigateNextIcon fontSize="large" />
      </IconButton>
    );
  };

  const renderBefore = () => {
    const isDisabled = !(props.currentItemIndex > 0) || !isActive;

    return (
      <IconButton
        className={classes.button}
        onClick={props.before}
        disabled={isDisabled}
      >
        <NavigateBeforeIcon fontSize="large" />
      </IconButton>
    );
  };

  return (
    <div className={classes.navigationContainer}>
      {renderBefore()}
      {renderNext()}
    </div>
  );
};

export default ImageNavigation;
