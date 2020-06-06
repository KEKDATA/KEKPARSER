import * as React from 'react';
import Button from '@material-ui/core/Button';

import { exportCsvFx } from './model';

export const CsvConvert: React.FC<{
  convertData: Array<any>;
  text: string;
}> = ({ convertData, text }) => {
  const handleClickConvert = () => {
    exportCsvFx(convertData);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      data-src-conver={convertData}
      onClick={handleClickConvert}>
      {text}
    </Button>
  );
};
