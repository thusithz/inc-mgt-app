import React, { useState, memo, FC, MouseEvent } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Popover from '@mui/material/Popover';
import { makeStyles } from '@utils/makeStyles';
import { alpha } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';

import { removeCookies } from 'cookies-next';
import { Cookies } from '@utils/cookies';
import { signOut, useSession } from 'next-auth/react';

import { UserSession } from 'src/types/main';

const useStyles = makeStyles()((theme) => ({
  listItem: {
    position: 'relative',
    width: '100%',
    height: '82px',
    display: 'flex',
    justifyContent: 'center',
    '&:hover': {
      '& svg': {
        color: 'white',
      },
      '& p': {
        color: 'white',
      },
    },
  },
  profileIcon: {
    position: 'relative',
    '& svg': {
      width: '35px',
      height: '35px',
      color: theme.palette.common.boulder,
      '&:hover': {
        color: 'white',
      },
    },
  },
  logOutPopover: {
    borderRadius: 'unset',
    boxShadow: `0px 4px 15px rgba(0, 0, 0, 0.1)`,
    '& ul': {
      minWidth: theme.spacing(15),
      paddingTop: 0,
      paddingBottom: 0,
      '&:hover': {
        color: theme.palette.common.bhaBlue,
        backgroundColor: alpha(theme.palette.common.matisse, 0.1),
      },
    },
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.9),
    },
  },
  listSelected: {
    backgroundColor: theme.palette.primary.main,
    '& svg': {
      color: 'white',
    },
    '& p': {
      color: 'white',
    },
  },
  username: {
    position: 'absolute',
    fontSize: theme.spacing(1),
    fontWeight: '400',
    letterSpacing: '0.05em',
    color: theme.palette.common.boulder,
    marginTop: theme.spacing(6),
  },
}));

const ProfileItem: FC = () => {
  const [dense] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOppen = Boolean(anchorEl);
  const { classes, cx } = useStyles();
  const { data: session } = useSession() as { data: UserSession };

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    // ToDo: make cookie https only and remove with serverside api
    removeCookies(Cookies.TOKEN);
    signOut();
  };

  return (
    <List dense={dense} className={classes.list}>
      <ListItem
        button
        className={cx(classes.listItem, {
          [classes.listSelected]: isOppen,
        })}
        onClick={handleClick}
      >
        <div className={classes.profileIcon}>
          <AccountCircleIcon />
        </div>
        <Typography className={classes.username}>{session?.user?.username}</Typography>
      </ListItem>
      <Popover
        classes={{ paper: classes.logOutPopover }}
        id={isOppen ? 'profile' : undefined}
        open={isOppen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List>
          <ListItem button onClick={logOut}>
            Logout
          </ListItem>
        </List>
      </Popover>
    </List>
  );
};

export default memo(ProfileItem);
