import tokens from './tokens';

interface MaskedValue {
  value: string;
  escaped: number;
}

const maskit = (rawInput: string, mask: string, escapedCharacters: number): MaskedValue => {
  const input: string[] = rawInput.split('');
  const maskArray: string[] = mask.split('');
  const nextChar: string = input.pop();
  let position: number = input.length + escapedCharacters;
  let escaped: number = 0;
  let char: string = '';

  if (tokens[maskArray[position]] && tokens[maskArray[position]].continue) {
    char = maskArray[maskArray.length - 2];
    if (tokens[char].pattern && tokens[char].pattern.test(nextChar)) {
      input.push(tokens[char].transform ? tokens[char].transform(nextChar) : nextChar);
    }
    return {
      escaped,
      value: input.join(''),
    };
  }

  if (position >= maskArray.length) {
    if (tokens[maskArray[maskArray.length - 1]] && tokens[maskArray[maskArray.length - 1]].continue) {
      char = maskArray[maskArray.length - 2];
      if (tokens[char].pattern && tokens[char].pattern.test(nextChar)) {
        input.push(tokens[char].transform ? tokens[char].transform(nextChar) : nextChar);
      }
    }

    return {
      escaped,
      value: input.join(''),
    };
  }

  while (!tokens[maskArray[position]] || tokens[maskArray[position]].escape) {
    if (tokens[maskArray[position]] && tokens[maskArray[position]].escape) {
      position++;
      escaped++;
    }

    input.push(maskArray[position]);
    position++;
  }

  char = maskArray[position];
  if (tokens[char].pattern && tokens[char].pattern.test(nextChar)) {
    input.push(tokens[char].transform ? tokens[char].transform(nextChar) : nextChar);
  }

  return {
    escaped,
    value: input.join(''),
  };
};

export default maskit;
