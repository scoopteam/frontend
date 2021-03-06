import { css } from "@emotion/core";

import colours from "./colours";

// Define global styles

export default css`
  @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&display=swap');

  html, body, #root {
    height: 100%;
  }

  body, #root {
    display: flex;
    flex-direction: column;
    margin: 0;
    font-family: 'Alegreya Sans', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: ${colours.azure};
  }

  a:hover {
    text-decoration: underline;
  }

  .ReactModal__Overlay {
      opacity: 0;
      transition: opacity 400ms ease-in-out;
  }

  .ReactModal__Overlay--after-open{
      opacity: 1;
  }

  .ReactModal__Overlay--before-close{
      opacity: 0;
  }

`;
