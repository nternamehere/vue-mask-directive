import tokens from './tokens';

const demask = (input: string, mask: string): string => {
  const inputArray: string[] = input.split('');
  const maskArray: string[] = mask.split('');
  let iPosition: number = 0;
  let mPosition: number = 0;

  while (mPosition < maskArray.length) {
    if (!tokens[maskArray[mPosition]] && maskArray[mPosition] === inputArray[iPosition]) {
      inputArray.splice(iPosition, 1);
      mPosition++;
      continue;
    }

    if (tokens[maskArray[mPosition]]?.escape) {
      if (maskArray[mPosition + 1] === inputArray[iPosition]) {
        inputArray.splice(iPosition, 1);
        mPosition += 2;
      }
      continue;
    }

    iPosition++;
    mPosition++;
  }

  return inputArray.join('');
};

export default demask;
