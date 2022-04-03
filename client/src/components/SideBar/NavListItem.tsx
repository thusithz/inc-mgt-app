import { FC, useState } from 'react';

import { makeStyles } from '@utils/makeStyles';
import { SvgIconComponent } from '@mui/icons-material';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const useStyles = makeStyles()((theme) => ({
  itemIcon: {
    position: 'relative',
    height: '22px',
    width: '22px',
  },
  itemText: {
    marginLeft: theme.spacing(2),
  },
}));

type NavListItemProp = {
  text: string;
  link: string;
  iconSvg?: SvgIconComponent;
  selected?: boolean;
};

const NavListItem: FC<NavListItemProp> = ({ text, link, iconSvg: IconSvg, selected }) => {
  const { classes, cx } = useStyles();
  const [itemFocuse, setItemFocuse] = useState(null);

  return (
    <div>
      <a href={link}>
        <ListItem
          button
          selected={selected}
          onMouseEnter={() => {
            if (!itemFocuse) setItemFocuse(true);
          }}
          onMouseLeave={() => {
            if (itemFocuse) setItemFocuse(false);
          }}
        >
          {IconSvg && (
            <div className={cx(classes.itemIcon)}>
              <IconSvg />
            </div>
          )}
          <ListItemText className={cx({ [classes.itemText]: !!IconSvg })} primary={text} />
        </ListItem>
      </a>
    </div>
  );
};
export default NavListItem;
