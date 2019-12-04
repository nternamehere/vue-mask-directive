import applyTheMask from '../src/applyTheMask';

describe('Passes vue-the-mask tests', () => {
  it('masks 12 with #.#', () => {
    expect(applyTheMask('12', '#.#')).toBe('1.2');
  });

  it('masks 1 with (#)', () => {
    expect(applyTheMask('1', '(#)')).toBe('(1)');
  });

  it('masks 1 with [(#)]', () => {
    expect(applyTheMask('1', '[(#)]')).toBe('[(1)]');
  });

  it('masks 1 with #.#', () => {
    expect(applyTheMask('1', '#.#')).toBe('1');
  });

  it('masks 1. with #.#', () => {
    expect(applyTheMask('1.', '#.#')).toBe('1.');
  });

  it('masks 123 with #.#', () => {
    expect(applyTheMask('123', '#.#')).toBe('1.2');
  });

  it('masks abcd12345 with AAA-####', () => {
    expect(applyTheMask('abcd12345', 'AAA-####')).toBe('ABC-1234');
  });

  it('masks a5-12-34 with (XX) - ## - ##', () => {
    expect(applyTheMask('a5-12-34', '(XX) - ## - ##')).toBe('(a5) - 12 - 34');
  });

  it('masks 123 with ##(#)', () => {
    expect(applyTheMask('123', '##(#)')).toBe('12(3)');
  });

  it('masks 123 with #!#(#)', () => {
    expect(applyTheMask('12', '#!#(#)')).toBe('1#(2)');
  });

  it('masks 12 with !+1 #', () => {
    expect(applyTheMask('12', '!+1 #')).toBe('+1 2');
  });

  it('masks 2 with !+1 #', () => {
    expect(applyTheMask('2', '!+1 #')).toBe('+1 2');
  });
});
