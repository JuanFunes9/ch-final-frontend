import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import AppsIcon from '@mui/icons-material/Apps';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function TemporaryDrawer() {


  const { user } = useContext(UserContext);
  const navigate = useNavigate();


  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const userItems = [{
    name: 'Productos',
    route: '/products',
    icon: () => { return <AppsIcon /> }
  }, {
    name: 'Chat',
    route: '/chat',
    icon: () => { return <ChatIcon /> }
  }, {
    name: 'Perfil',
    route: '/profile',
    icon: () => { return <AccountBoxIcon /> }
  }, {
    name: 'Carrito',
    route: '/cart',
    icon: () => { return <ShoppingCartIcon /> }
  }];

  const adminItems = [
    {
      name: 'Cargar Producto',
      route: '/add-product',
      icon: () => { return <AddIcon /> }
    },
    ...userItems,
  ];

  const adminList = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {adminItems.map(item => (
          <ListItem key={item.name} >
            <Link to={item.route}>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon()}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
        <Divider />
        <ListItem >
          <a href='https://juan-funes.vercel.app/' target="_blank">
            <ListItemButton >
              <ListItemIcon >
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={'Sobre Nosotros'} />
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem >
          <a href='https://github.com/JuanFunes9/ch-final-frontend/' target="_blank">
            <ListItemButton >
              <ListItemIcon >
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary={'GitHub (Front-end)'} />
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem >
          <a href='https://github.com/JuanFunes9/ch-final-backend' target="_blank">
            <ListItemButton >
              <ListItemIcon >
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary={'GitHub (Back-end)'} />
            </ListItemButton>
          </a>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  const userList = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {userItems.map(item => (
          <ListItem key={item.name} >
            <Link to={item.route} >
              <ListItemButton >
                <ListItemIcon >
                  {item.icon()}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
        <Divider />
        <ListItem >
          <Link to={'/about-us'} >
            <ListItemButton >
              <ListItemIcon >
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={'Sobre Nosotros'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem >
          <a href='https://github.com/JuanFunes9/ch-final-frontend/' target="_blank">
            <ListItemButton >
              <ListItemIcon >
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary={'GitHub (Front-end)'} />
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem >
          <a href='https://github.com/JuanFunes9/ch-final-backend' target="_blank">
            <ListItemButton >
              <ListItemIcon >
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary={'GitHub (Back-end)'} />
            </ListItemButton>
          </a>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon
            onClick={toggleDrawer(anchor, true)}
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }}
            className='menu-icon-nav'
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {
              (user && user.role === 'ADMIN_ROLE') ? adminList(anchor) : userList(anchor)
            }
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
