import { spawn } from 'child_process';

export const getRuSentiment = async (
  data: Array<{ text: string; textIndex: number }>,
) => {
  // Пустые значения не принимает библиотека и крашится
  const notEmptyData = data
    .map(({ text }) => text)
    .filter(text => {
      const withoutSpaces = text.replace(/\s/g, '');

      return withoutSpaces.length > 0;
    });

  let indexOfSentiment = 0;

  const pythonProcess = spawn('python3', [
    'src/lib/ru_social_sentiment/sentiment_coefficient.py',
    JSON.stringify(notEmptyData),
  ]);

  const getSentiments = () => {
    return new Promise<{
      dataWithSentiments: { [key: string]: number };
      countOfSentimentCoefficients: number;
    }>((resolve, reject) => {
      pythonProcess.stdout.on('data', sentiments => {
        const result = sentiments.toString();

        const normalizedSentiments: { [key: string]: number } = {};

        let countOfSentimentCoefficients = 0;

        if (result !== undefined && result.length > 0) {
          const parsedResult = JSON.parse(result.replace(/'/g, '"'));

          data.forEach(({ text, textIndex }) => {
            const withoutSpaces = text.replace(/\s/g, '');
            let coefficient = 0;

            if (withoutSpaces.length > 0) {
              const sentiment: { [key: string]: number } =
                parsedResult[indexOfSentiment];

              const sentimentKeys = Object.keys(sentiment);
              const isNegative = sentimentKeys.includes('negative');
              const isPositive = sentimentKeys.includes('positive');

              if (isNegative) {
                coefficient = -1 * sentiment.negative;
              } else if (isPositive) {
                coefficient = sentiment.positive;
              } else {
                const [_, valueSentiment] = Object.entries(sentiment)[0];

                coefficient = valueSentiment;
              }

              indexOfSentiment++;

              countOfSentimentCoefficients =
                countOfSentimentCoefficients + coefficient;
            }

            normalizedSentiments[textIndex] = coefficient;
          });
        }

        resolve({
          dataWithSentiments: normalizedSentiments,
          countOfSentimentCoefficients,
        });

        pythonProcess.kill('SIGTERM');
      });
    });
  };

  const result = await getSentiments();

  return result;
};
