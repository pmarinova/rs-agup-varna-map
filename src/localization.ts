import { Localization as CoreLocalization } from '@mui/material/locale';
import { bgBG as coreLocalizationBG } from '@mui/material/locale';
import { bgBG as gridLocalizationBG } from '@mui/x-data-grid/locales';

const tablePaginationLocalizationBG: CoreLocalization = {
  components: {
    MuiTablePagination: {
      defaultProps: {
        labelDisplayedRows: ({ from, to, count }) => `${from}–${to} от ${count}`,
      }
    }
  }
};

export const localization = [
  coreLocalizationBG, 
  gridLocalizationBG,
  tablePaginationLocalizationBG
];