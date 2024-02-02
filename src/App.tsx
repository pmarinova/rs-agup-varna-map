import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';

import { useMediaQuery, useTheme } from '@mui/material';

import { loadBuildingPermits, loadPropertyCoordinates } from './Data';
import { BuildingPermitsMap, BuildingPermitsMapData } from './Map';

import './App.css';

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

function App() {

  const [data, setData] = React.useState<BuildingPermitsMapData>({ permits: [], coordinates: {} });

  const appBarHeight = useAppBarHeight();

  React.useEffect(() => {
    const loadData = async () => {
      const buildingPermits = await loadBuildingPermits();
      const propertyCoordinates = await loadPropertyCoordinates();
      setData({
        permits: buildingPermits.filter(permit => propertyCoordinates[permit.propertyId]),
        coordinates: propertyCoordinates
      });
    };
    loadData();
  }, []);

  return (
    <Container maxWidth={false} disableGutters>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {document.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, height: `calc(100vh - ${appBarHeight}px)` }}>
        <BuildingPermitsMap data={data} />
      </Box>
    </Container>
  );
}

export default App;