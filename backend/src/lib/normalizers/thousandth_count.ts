export const getNormalizedThousandthValue = (value: string) => {
  let normalizedValue = Number(value);

  if (value.includes('K')) {
    const valueWithoutKFormat = Number(value.replace('K', ''));
    normalizedValue = valueWithoutKFormat * 1000;
  }

  return normalizedValue;
};
