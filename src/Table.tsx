import React from 'react';

import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid';
import { GridComparatorFn } from '@mui/x-data-grid';
import { GridRowId } from '@mui/x-data-grid';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useGridApiRef, gridFilterModelSelector, gridFilteredSortedRowIdsSelector } from '@mui/x-data-grid';

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
  showOnMapHandler?: (id: string) => void;
  onDataFilterChange?: (ids: string[] | undefined) => void;
};

const BuildingPermitsTable = ({ data, showOnMapHandler, onDataFilterChange }: BuildingPermitsTableProps) => {

  const gridApiRef = useGridApiRef();

  React.useEffect(() => {
    
    const handleFilteredRowsChange = () => { 
      const filterModel = gridFilterModelSelector(gridApiRef);
      if (!filterModel.items.length && !filterModel.quickFilterValues?.length) {
        onDataFilterChange?.(undefined); // no filter
      } else {
        const filteredRowIds = gridFilteredSortedRowIdsSelector(gridApiRef) as string[];
        onDataFilterChange?.(filteredRowIds);
      }
    };
    
    gridApiRef.current.subscribeEvent?.('rowsSet', handleFilteredRowsChange);
    gridApiRef.current.subscribeEvent?.('filteredRowsSet', handleFilteredRowsChange);
  
  }, [gridApiRef]);

  const handleShowOnMapClick = (id: GridRowId) => () => {
    showOnMapHandler?.(id as string);
  };

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
    {
      field: 'actions', 
      type: 'actions', 
      getActions: ({ id }) => [(
        <GridActionsCellItem
          key="show_on_map"
          icon={<LocationOnIcon />}
          label="Покажи на картата"
          sx={{ color: 'primary.main' }}
          onClick={handleShowOnMapClick(id)}
        />
      )]}
  ];

  return (
    <DataGrid
      apiRef={gridApiRef}
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