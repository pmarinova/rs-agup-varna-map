import React from 'react';

import { useDebounce } from 'use-debounce';

import { AppLayout } from './AppLayout';
import { Data, loadData } from './Data';
import { BuildingPermitsMap } from './Map';
import { BuildingPermitsTable } from './Table';

import './App.css';

function App() {

  const [data, setData] = React.useState<Data>({ permits: [], coordinates: {} });
  const [zoomToPermitId, setZoomToPermitId] = React.useState<string | undefined>();
  const [filteredIds, setFilteredIds] = React.useState<string[] | undefined>(undefined);

  const [filteredPermits] = useDebounce(filteredIds, 1000);

  React.useEffect(() => {
    (async () => {
      const data = await loadData();
      setData(data);
    })();
  }, []);

  const mainContent = 
    <BuildingPermitsMap 
      data={data} 
      zoomTo={zoomToPermitId} 
      filteredPermits={filteredPermits} 
    />;
  
  const drawerContent = 
    <BuildingPermitsTable 
      data={data} 
      showOnMapHandler={setZoomToPermitId} 
      onDataFilterChange={setFilteredIds} 
    />;

  return (
    <AppLayout 
      mainContent={mainContent}
      drawerContent={drawerContent}
    />
  );
}

export default App;