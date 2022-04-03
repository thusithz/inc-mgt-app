import routes from '@config/routes';
import { SvgIconComponent } from '@mui/icons-material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ListAltIcon from '@mui/icons-material/ListAlt';

type MenuType = Array<{
  name: string;
  items: Array<{
    link: string;
    text: string;
    iconSvg?: SvgIconComponent;
    isExternal?: boolean;
  }>;
  iconSvg?: SvgIconComponent;
}>;

const menus: MenuType = [
  {
    name: 'Inc',
    iconSvg: AddTaskIcon,
    items: [
      {
        text: 'List',
        link: routes.INC.LIST,
        iconSvg: ListAltIcon,
      },
    ],
  },
];

export default menus;
