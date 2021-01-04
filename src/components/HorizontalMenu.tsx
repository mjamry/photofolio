import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { HorizontalMenuItemPositionProps, HorizontalMenuItemPosition } from './HorizontalMenuItem';
import { Theme } from '../ThemeProvider';

const useStyles = makeStyles((theme: Theme) => ({
  horizontalMenu: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${fade(theme.palette.primary.main, 0.25)}`,
    padding: '20px',
    color: theme.palette.primary.main,
  },
  leftMenu: {
    display: 'flex',
    flexFlow: 'row',
  },
  rightMenu: {
    display: 'flex',
    flexFlow: 'row',
  },
  centerMenu: {
    display: 'flex',
    flexFlow: 'row',

  },
}));

export type Props = {
  children:
  React.ReactElement<HorizontalMenuItemPositionProps>
  | React.ReactElement<HorizontalMenuItemPositionProps>[]
};

const HorizontalMenu = (props: Props) => {
  const classes = useStyles();

  const { children } = props;
  return (
    <div className={classes.horizontalMenu}>

      <div className={classes.leftMenu}>
        {React.Children.map(children,
          (child) => (child.props.position === HorizontalMenuItemPosition.left ? child : null))}
      </div>
      <div className={classes.centerMenu}>
        {React.Children.map(children,
          (child) => (child.props.position === HorizontalMenuItemPosition.center ? child : null))}
      </div>
      <div className={classes.rightMenu}>
        {React.Children.map(children,
          (child) => (child.props.position === HorizontalMenuItemPosition.right ? child : null))}
      </div>
    </div>
  );
};

export default HorizontalMenu;
