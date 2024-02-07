import React from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridComparatorFn } from '@mui/x-data-grid';

import { BuildingPermit } from './Data';

const permitIdComparator: GridComparatorFn<string> = (id1, id2) => {
  const [number1, date1] = id1.split('/');
  const [number2, date2] = id2.split('/');
  return date1.localeCompare(date2) || (parseInt(number1) - parseInt(number2));
};

type BuildingPermitsTableData = {
  permits: BuildingPermit[];
};

type BuildingPermitsTableProps = {
  data: BuildingPermitsTableData;
};

const BuildingPermitsTable = ({ data }: BuildingPermitsTableProps) => {

  const columns: GridColDef[] = [
    {
      field: 'id', 
      headerName: 'Разрешение №', 
      flex: 10,
      sortComparator: permitIdComparator
    },
    {
      field: 'description', 
      headerName: 'Обект', 
      flex: 90
    },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={data.permits}
      density="compact"
      disableRowSelectionOnClick
      disableColumnSelector
    />
  );
};

export type { BuildingPermitsTableData };
export { BuildingPermitsTable };