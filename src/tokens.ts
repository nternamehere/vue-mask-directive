interface Tokens {
  [x: string]: {
    escape?: boolean;
    continue?: boolean;
    pattern?: RegExp;
    transform?: (v: string) => string;
  };
}

const tokens: Tokens = {
  '!': { escape: true },
  '#': { pattern: /\d/ },
  '+': { continue: true },
  'A': { pattern: /[a-zA-Z]/, transform: (v: string) => v.toLocaleUpperCase() },
  'S': { pattern: /[a-zA-Z]/ },
  'X': { pattern: /[0-9a-zA-Z]/ },
  'a': { pattern: /[a-zA-Z]/, transform: (v: string) => v.toLocaleLowerCase() },
};

export default tokens;
