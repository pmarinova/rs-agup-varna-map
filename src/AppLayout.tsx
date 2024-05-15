import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuIcon from '@mui/icons-material/Menu';

import { styled, useMediaQuery, useTheme } from '@mui/material';


// see https://github.com/mui/material-ui/issues/10739
const useAppBarHeight = () => {
  const {
    mixins: { toolbar },
    breakpoints,
  } = useTheme();

  const queryDesktop = breakpoints.up('sm');
  const queryLandscape = `${breakpoints.up('xs')} and (orientation: landscape)`;

  const isDesktop = useMediaQuery(queryDesktop);
  const isLandscape = useMediaQuery(queryLandscape);

  const cssToolbar =
    toolbar[isDesktop ? queryDesktop : isLandscape ? queryLandscape : ''];

  return ((cssToolbar ?? toolbar) as { minHeight: number })?.minHeight ?? 0;
};


const FloatingButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(2)
}));


type MenuProps = {
  items: React.ReactNode[];
  onSelected?: (item: React.ReactNode) => void;
};

type AppLayoutProps = {
  mainContent: React.ReactNode;
  drawerContent: React.ReactNode;
  menu: MenuProps;
};

const AppLayout = ({ mainContent, drawerContent, menu }: AppLayoutProps) => {

  const appBarHeight = useAppBarHeight();

  const [menuButton, setMenuButton] = React.useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuButton(event.currentTarget);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Container maxWidth={false} disableGutters>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={openMenu}
            aria-label="menu"
            color="inherit"
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={menuButton}
            open={menuOpen}
            onClose={closeMenu}
            MenuListProps={{
              'aria-labelledby': 'menu',
            }}
          >
            {menu.items.map((menuItem, index) => 
              <MenuItem key={index} onClick={() => { menu.onSelected?.(menuItem); closeMenu(); }}>
                {menuItem}
              </MenuItem>
            )}
          </Menu>
          <Typography variant="h6" noWrap component="div">
            {document.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, height: `calc(100vh - ${appBarHeight}px)` }}>
        {mainContent}
      </Box>
      <FloatingButton color="primary" aria-label="filter" onClick={toggleDrawer}>
        <FilterAltIcon />
      </FloatingButton>
      <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer} keepMounted>
        <Box sx={{ height: '40vh' }}>
          {drawerContent}
        </Box>
      </Drawer>
    </Container>
  );
};

export type { AppLayoutProps, MenuProps };
export { AppLayout };