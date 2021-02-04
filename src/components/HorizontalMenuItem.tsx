import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  horizontalMenuItem: {
    paddingLeft: '10px',
    paddingRight: '10px',
    textTransform: 'uppercase',
    fontSize: '8pt',
    userSelect: 'none',
  },
  activeItem: {
    '&::before': {
      borderLeft: '1px solid white',
    },
    cursor: 'pointer',
  },
});

export type HorizontalMenuItemPositionProps = {
  title: string,
  onClick?: () => void,
  position: HorizontalMenuItemPosition,
};

export enum HorizontalMenuItemPosition {
  right,
  left,
  center,
}

const HorizontalMenuItem = (props: HorizontalMenuItemPositionProps) => {
  const classes = useStyles();
  const { title, onClick } = props;

  return (
    <div
      className={`${classes.horizontalMenuItem} ${onClick ? classes.activeItem : ''}`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default HorizontalMenuItem;
