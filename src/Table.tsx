import React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid';
import { GridComparatorFn } from '@mui/x-data-grid';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';

import { BuildingPermit } from './Data';

const permitIdComparator: GridComparatorFn<string> = (id1, id2) => {
  const [number1, date1] = id1.split('/');
  const [number2, date2] = id2.split('/');
  return date1.localeCompare(date2) || (parseInt(number1) - parseInt(number2));
};

const QuickSearchToolbar = () => (
  <Box sx={{ p: 0.5, pb: 0 }}>
    <GridToolbarQuickFilter />
  </Box>
);

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
      slots={{ toolbar: QuickSearchToolbar }}
      disableRowSelectionOnClick
      disableColumnSelector
    />
  );
};

export type { BuildingPermitsTableData };
export { BuildingPermitsTable };