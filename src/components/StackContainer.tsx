import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '../ThemeProvider';

const useStyles = makeStyles<Theme, Props>({
  container: {
    display: 'grid',
    boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)',
  },
  childContainer: (props) => ({
    height: props.height,
    width: props.width,
    gridColumn: 1,
    gridRow: 1,
  }),
});

export type Props = UIProps & {
  children: React.ReactNode[]
};

export type UIProps = {
  height: string,
  width: string
};

const StackContainer = (props:Props) => {
  const { children } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.container}>
      {children.map((item, index) => (
        <div className={classes.childContainer} key={index} style={{ zIndex: 999 - index }}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default StackContainer;
