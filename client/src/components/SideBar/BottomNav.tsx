import React, { useState, memo, FC, MouseEvent } from 'react';
import { makeStyles } from '@utils/makeStyles';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const useStyles = makeStyles()(() => ({
  root: {
    width: 220,
  },
}));

const SimpleBottomNavigation: FC = () => {
  const { classes } = useStyles();
  const [value, setValue] = useState(0);
  return (
    <BottomNavigation
      value={value}
      onChange={(event: MouseEvent<HTMLButtonElement>, newValue: number) => {
        event.preventDefault();
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label='FAQ' />
      <BottomNavigationAction label='SUPPORT' />
      <BottomNavigationAction label='SETTINGS' />
    </BottomNavigation>
  );
};

export default memo(SimpleBottomNavigation);
