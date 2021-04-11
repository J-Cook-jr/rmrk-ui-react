import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: "Twemoji Mozilla";
        src: url('/fonts/TwemojiMozilla/TwemojiMozilla.ttf') format('truetype');
        font-weight: normal;
      }
      `}
  />
);
export default Fonts;
