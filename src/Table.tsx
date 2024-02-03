import React from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid';

import { BuildingPermit } from './Data';

type BuildingPermitsTableData = {
  permits: BuildingPermit[];
};

type BuildingPermitsTableProps = {
  data: BuildingPermitsTableData;
};

const BuildingPermitsTable = ({ data }: BuildingPermitsTableProps) => {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Разрешение №', flex: 10 },
    { field: 'description', headerName: 'Обект', flex: 90 },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={data.permits}
      density="compact"
    />
  );
};

export type { BuildingPermitsTableData };
export { BuildingPermitsTable };