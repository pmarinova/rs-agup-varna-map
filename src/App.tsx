import React from 'react';

import { AppLayout } from './AppLayout';
import { Data, loadData } from './Data';
import { BuildingPermitsMap } from './Map';
import { BuildingPermitsTable } from './Table';

import './App.css';

function App() {

  const [data, setData] = React.useState<Data>({ permits: [], coordinates: {} });

  React.useEffect(() => {
    const load = async () => { setData(await loadData()); };
    load();
  }, []);

  const mainContent = <BuildingPermitsMap data={data} />;
  const drawerContent = <BuildingPermitsTable data={data} />;

  return (
    <AppLayout 
      mainContent={mainContent}
      drawerContent={drawerContent}
    />
  );
}

export default App;