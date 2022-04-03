import React, { FC, useState, memo, ReactNode } from 'react';
import { useRouter } from 'next/router';

// material
import { styled } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

import menus from '@config/menus';
import { makeStyles } from '@utils/makeStyles';
import routes from '@config/routes';

import NavMenu from './SideBar/NavMenu';

import Wrapper from './Wrapper';
import ProfileItem from './SideBar/ProfileItem';

const drawerWidth = 121;

const StyledToolbar = styled(Toolbar)(() => ({
  '@media all': {
    minHeight: 80,
  },
}));

type Props = {
  title: string | undefined;
  children: ReactNode;
  contentStyles?: string;
};

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    height: '80px',
    background: 'white',
    color: 'black',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    background: 'white',
    boxShadow: `0px 4px 15px rgba(0, 0, 0, 0.1)`,
    borderRight: 'none',
    '& button': {
      '&:hover': {
        background: 'none',
      },
    },
  },
  drawerOpen: {
    width: drawerWidth,
    boxShadow: `0px 4px 15px rgba(0, 0, 0, 0.1)`,
    borderRight: 'none',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    minHeight: `80px !important`,
  },
  content: {
    width: '100%',
    padding: theme.spacing(3),
  },
  toolbarRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  brandContainer: {
    height: '80px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.main,
    fontWeight: 800,
    fontSize: '22px',
  },
  navmenu: {
    marginTop: '30px',
  },
  title: {
    fontWeight: 'normal',
    color: 'black',
  },
}));

const PageLayout: FC<Props> = ({ children, title = '', contentStyles }) => {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [open] = useState(true);

  return (
    <Wrapper>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='fixed' className={classes.appBar}>
          <StyledToolbar>
            <div className={classes.toolbarRow}>
              <div>
                <Typography className={classes.title} variant='h6' noWrap>
                  {title}
                </Typography>
              </div>
            </div>
          </StyledToolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          className={cx(classes.drawer, {
            [classes.drawerOpen]: open,
          })}
          classes={{
            paper: classes.drawerOpen,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.toolbar}>
            <div className={classes.brandContainer}>
              {' '}
              <a href={routes.HOME}>Inc Mgt</a>
            </div>
          </div>

          <List className={classes.navmenu}>
            {menus.map((menu, index) => (
              <NavMenu key={index} menu={menu} currentPath={router.asPath} />
            ))}
          </List>
          <div style={{ marginTop: 'auto' }}>
            <ProfileItem />
          </div>
        </Drawer>
        <main className={cx({ [classes.content]: true, [contentStyles]: true })}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </Wrapper>
  );
};

export default memo(PageLayout);
