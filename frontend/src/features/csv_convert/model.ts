import { createEffect } from 'effector';

import { isBlobNotSupported } from '../../constants/blob_support';
import { downloadCsv } from '../../lib/download_csv';
import { getCurrentDate } from '../../lib/date';
import { speakMessage } from '../../lib/speech_synthesis';

export const exportCsvFx = createEffect<Array<any>, any>({
  handler: dataToConvert => {
    if (isBlobNotSupported) {
      speakMessage('Не сегодня, браузер обнови в начале');
    }

    const firstData = dataToConvert[0];
    const labels = Object.keys(firstData).join(',');
    const fields = dataToConvert.map(data => {
      const normalizedData = Object.values(data)
        .map(value => `"${value}"`)
        .join(',');

      return normalizedData;
    });
    const normalizedDataToConvert = [labels, ...fields].join('\n');
    const fileName = `${getCurrentDate()}_parsed_tweets.csv`;

    downloadCsv(normalizedDataToConvert, fileName);
  },
});
