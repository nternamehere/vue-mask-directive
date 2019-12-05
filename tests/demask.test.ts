import demask from '../src/demask';

describe('Removes the mask from masked text', () => {
  it('demasks (123)456-7890 with mask (###)###-####', () => {
    expect(demask('(123)456-7890', '(###)###-####')).toBe('1234567890');
  });

  it('demasks (123)#56-7890 with mask (###)!###-####', () => {
    expect(demask('(123)#56-7890', '(###)!###-####')).toBe('123567890');
  });

  it('demasks asd with mask a+', () => {
    expect(demask('asd', 'a+')).toBe('asd');
  });
});
