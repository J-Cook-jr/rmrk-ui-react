import { unifiedToNative, isValidEmoji } from './unicode-to-emoji';

// Test emoji
describe('utils: unifiedToNative', () => {
  it('Should convert emoji unicode', () => {
    expect(unifiedToNative('1f422')).toBe('🐢');
  });

  it('Should convert emoji unicode', () => {
    expect(unifiedToNative('1f422s')).toBe('');
  });

  it('Should validate emoji unicode', () => {
    expect(isValidEmoji('1f422')).toBeTruthy();
  });

  it('Should validate emoji unicode', () => {
    expect(isValidEmoji('1f422d')).toBeFalsy();
  });
});
