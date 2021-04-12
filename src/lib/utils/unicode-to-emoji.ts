import stringFromCodePoint from './polyfill-string-from-codepoint';
import emojiRegex from 'emoji-regex/RGI_Emoji';

/**
 * Converted dashed emoji unicodes into native emoji unicode with prefix
 * @param unified - emoji unicode
 */
export const unifiedToNative = (unified: string) => {
  try {
    const unicodes = unified.split('-'),
      codePoints = unicodes.map((u) => `0x${u}`);

    return stringFromCodePoint.apply(
      null,
      codePoints.map((codePoint) => Number(codePoint)),
    );
  } catch (error) {
    return '';
  }
};

/**
 * Validate emoji
 * @param emoji
 */
export const isValidEmoji = (emoji: string) => {
  const unified = unifiedToNative(emoji);
  const regex = emojiRegex();
  return regex.test(unified);
};
