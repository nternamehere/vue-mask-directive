import applyTheMask from '../src/applyTheMask';

describe('Handles all defined tokens', () => {
  it('masks asdf1234asd with aAAA#+', () => {
    expect(applyTheMask('asdf1234asd', 'aAAA#+')).toBe('aSDF1234');
  });

  it('masks 15a15 with #+', () => {
    expect(applyTheMask('15a15', '#+')).toBe('1515');
  });
});
