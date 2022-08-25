import { escapeDoubleQuotesForCSV } from './converters';

describe('escapeDoubleQuotesForCSV', () => {
  test('escapes just double quotes', () => {
    expect(escapeDoubleQuotesForCSV('"')).toBe('""');
    expect(escapeDoubleQuotesForCSV('"""')).toBe('""""""');
  });

  test('escapes double quotes in strings', () => {
    expect(escapeDoubleQuotesForCSV('"文字列の前後"')).toBe('""文字列の前後""');
    expect(escapeDoubleQuotesForCSV('文字列"の間')).toBe('文字列""の間');
    expect(escapeDoubleQuotesForCSV('"文字列の"前後と間"')).toBe('""文字列の""前後と間""');
  });

  test('escapes double quotes in other symbols', () => {
    expect(escapeDoubleQuotesForCSV('!"#$%&\'()*+.,/:;<=>?@[]^_`{|}~')).toBe('!""#$%&\'()*+.,/:;<=>?@[]^_`{|}~');
  });
});
