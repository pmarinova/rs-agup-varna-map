import React from 'react';

import { AppLayout } from './AppLayout';
import { Data, loadData } from './Data';
import { BuildingPermitsMap } from './Map';
import { BuildingPermitsTable } from './Table';

import './App.css';

function App() {

  const [data, setData] = React.useState<Data>({ permits: [], coordinates: {} });
  const [zoomToPermitId, setZoomToPermitId] = React.useState<string | undefined>();

  React.useEffect(() => {
    (async () => {
      const data = await loadData();
      setData(data);
    })();
  }, []);

  const mainContent = <BuildingPermitsMap data={data} zoomTo={zoomToPermitId} />;
  const drawerContent = <BuildingPermitsTable data={data} showOnMapHandler={setZoomToPermitId}/>;

  return (
    <AppLayout 
      mainContent={mainContent}
      drawerContent={drawerContent}
    />
  );
}

export default App;