import maskit from './maskit';

const applyTheMask = (input: string, mask: string): string => {
  let masked: string = '';
  let escapedCharacters: number = 0;
  const inputArray: string[] = input.split('');

  while (inputArray.length > 0) {
    const { value, escaped } = maskit(masked + inputArray.shift(), mask, escapedCharacters);
    escapedCharacters += escaped;
    masked = value;
  }

  return masked;
};

export default applyTheMask;
