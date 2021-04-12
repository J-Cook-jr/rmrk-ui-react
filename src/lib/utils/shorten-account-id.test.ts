import { shortenAccountId } from './shorten-account-id';

// Test shortenAccountId
describe('utils: shortenAccountId', () => {
  it('Should shorten string if its longer than 12 letter', () => {
    expect(shortenAccountId('12345678912345678')).toBe('123456789123...');
  });

  it('Should shorten string if its longer than 12 letter in the middle', () => {
    expect(shortenAccountId('12345678912345678', true)).toBe('1234...5678');
  });
});
