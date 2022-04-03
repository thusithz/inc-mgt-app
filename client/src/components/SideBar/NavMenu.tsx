import React, { memo, FC, useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import { SvgIconComponent } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import List from '@mui/material/List';
import Popover from '@mui/material/Popover';
import ListItem from '@mui/material/ListItem';
import OutboxIcon from '@mui/icons-material/Outbox';

import NavListItem from '@components/SideBar/NavListItem';
import { makeStyles } from '@utils/makeStyles';

const useStyles = makeStyles()((theme) => ({
  root: {
    width: '100%',
    height: '72px',
    display: 'flex',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.9),
      '& svg': {
        color: 'white',
      },
    },
  },
  popover: {
    borderRadius: 'unset',
    boxShadow: `0px 4px 15px rgba(0, 0, 0, 0.1)`,
  },
  navList: {
    width: '100%',
    minWidth: theme.spacing(25),
    paddingTop: 0,
    paddingBottom: 0,
    color: theme.palette.common.boulder,
    '& .MuiListItem-button': {
      '&:hover': {
        color: theme.palette.common.bhaBlue,
        backgroundColor: alpha(theme.palette.common.matisse, 0.1),
      },
    },
    '& .Mui-selected': {
      color: theme.palette.common.bhaBlue,
      backgroundColor: alpha(theme.palette.common.matisse, 0.1),
    },
  },
  itemSelected: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.9),
    },
    '& svg': {
      color: 'white',
    },
  },
  icon: {
    display: 'flex',
    '& svg': {
      width: '35px',
      height: '35px',
      color: theme.palette.common.boulder,
      '&:hover': {
        color: 'white',
      },
    },
  },
  name: {
    marginTop: theme.spacing(6),
    fontSize: theme.spacing(1),
    position: 'absolute',
    color: 'white',
  },
}));

type NavMenuProps = {
  menu: {
    name: string;
    items: Array<{
      link: string;
      text: string;
      iconSvg?: SvgIconComponent;
      isExternal?: boolean;
      permissions?: string[];
    }>;
    permissions?: string[];
    iconSvg?: SvgIconComponent;
  };
  currentPath: string;
};

const NavMenu: FC<NavMenuProps> = ({ menu, currentPath }) => {
  const [isSelected, setSelected] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { classes, cx } = useStyles();
  const open = Boolean(anchorEl);

  const { items, iconSvg: IconSvg, name } = menu;

  useEffect(() => {
    if (currentPath) {
      items.forEach((item) => {
        if (currentPath.includes(item.link)) {
          setSelected(true);
        }
      });
    }
  }, [currentPath]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ListItem
        className={cx(classes.root, {
          [classes.itemSelected]: isSelected || open,
        })}
        button
        onClick={handleClick}
        key={name.toLocaleUpperCase()}
      >
        <div className={cx(classes.icon)}>{IconSvg ? <IconSvg /> : <OutboxIcon />}</div>
        <Typography className={classes.name}>{name}</Typography>
      </ListItem>
      <Popover
        classes={{ paper: classes.popover }}
        id={open ? name : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List classes={{ root: classes.navList }}>
          {items.map(({ link, text, iconSvg: ItemSvg }, key) => (
            <>
              <NavListItem
                key={key}
                link={link}
                selected={link === currentPath}
                text={text}
                iconSvg={ItemSvg}
              />
            </>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default memo(NavMenu);
