import tokens from './tokens';

interface MaskedValue {
  value: string;
  escaped: number;
}

const maskit = (rawInput: string, mask: string, escapedCharacters: number): MaskedValue => {
  const input: string[] = rawInput.split('');
  const maskArray: string[] = mask.split('');
  const nextChar: string = input.pop() || '';
  let position: number = input.length + escapedCharacters;
  let escaped: number = 0;
  let char: string = '';

  if (tokens[maskArray[position]]?.continue) {
    char = maskArray[maskArray.length - 2];
    if (tokens[char]?.pattern?.test(nextChar)) {
      input.push(tokens[char].transform !== undefined ? tokens[char]?.transform(nextChar) : nextChar);
    }
    return {
      escaped,
      value: input.join(''),
    };
  }

  if (position >= maskArray.length) {
    if (tokens[maskArray[maskArray.length - 1]]?.continue) {
      char = maskArray[maskArray.length - 2];
      if (tokens[char]?.pattern?.test(nextChar)) {
        input.push(tokens[char].transform !== undefined ? tokens[char]?.transform(nextChar) : nextChar);
      }
    }

    return {
      escaped,
      value: input.join(''),
    };
  }

  while (!tokens[maskArray[position]] || tokens[maskArray[position]].escape) {
    if (tokens[maskArray[position]]?.escape) { position++; escaped++; }

    if (maskArray[position] === nextChar) {
      input.push(maskArray[position]);
      return {
        escaped,
        value: input.join(''),
      };
    }

    input.push(maskArray[position]);
    position++;
  }

  char = maskArray[position];
  if (tokens[char]?.pattern?.test(nextChar)) {
    input.push(tokens[char].transform !== undefined ? tokens[char]?.transform(nextChar) : nextChar);
    position++;
  }

  let completedOutput: string = '';

  while (position < maskArray.length) {
    if (tokens[maskArray[position]] && !tokens[maskArray[position]].escape) { completedOutput = ''; break; }
    if (tokens[maskArray[position]]?.escape) {
      position++;
      completedOutput += maskArray[position];
      position++;
      continue;
    }

    completedOutput += maskArray[position];
    position++;
  }

  return {
    escaped,
    value: input.join('') + completedOutput,
  };
};

export default maskit;
