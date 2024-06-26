import React from 'react';

import { useDebounce } from 'use-debounce';

import { AppLayout, MenuProps } from './AppLayout';
import { Data, loadData } from './Data';
import { BuildingPermitsMap } from './Map';
import { BuildingPermitsTable } from './Table';
import { LoadingOverlay } from './LoadingOverlay';

import './App.css';
import { ErrorAlert } from './ErrorAlert';

function App() {

  const YEARS = [2024, 2023, 2022, 2021, 2020];

  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [year, setYear] = React.useState<number>(YEARS[0]);
  const [data, setData] = React.useState<Data>({ permits: [], coordinates: {} });
  const [zoomToPermitId, setZoomToPermitId] = React.useState<string | undefined>();
  const [filteredIds, setFilteredIds] = React.useState<string[] | undefined>(undefined);

  const [filteredPermits] = useDebounce(filteredIds, 1000);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await loadData(year);
        setData(data);
        document.title = `Карта на разрешенията за строеж на АГУП Варна за ${year}г.`;
      } catch (e) {
        console.log(e);
        setError('Възникна грешка при зареждането на данните');
      } finally {
        setLoading(false);
      }
    })();
  }, [year]);

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

  const menu: MenuProps = {
    items: YEARS,
    onSelected: (selectedYear) => setYear(selectedYear as number)
  };

  return (
    <>
      <AppLayout 
        mainContent={mainContent}
        drawerContent={drawerContent}
        menu={menu}
      />
      <LoadingOverlay loading={isLoading} />
      <ErrorAlert error={error} />
    </>
  );
}

export default App;