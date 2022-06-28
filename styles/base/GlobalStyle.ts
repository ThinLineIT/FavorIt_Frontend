import { css } from '@emotion/react';

const GlobalStyle = () => css`
  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  body {
    margin: 0;
  }

  main {
    display: block;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  a {
    background-color: transparent;
  }

  abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }

  button,
  input {
    /* 1 */
    overflow: visible;
  }

  button,
  select {
    /* 1 */
    text-transform: none;
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
  }

  progress {
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  [type='search'] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  details {
    display: block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none;
  }

  * {
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  /* 스크롤바 보일지 안보일지 추후 논의 */
  /* *::-webkit-scrollbar {
    width: 0px;
    background: none;
  }
  *::-webkit-scrollbar-track {
    background: none;
  } */

  html {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    color: #3f4150;
  }

  h1 {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    background-color: transparent;
    border: 0;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  a,
  button {
    cursor: pointer;
  }

  button {
    padding: 0;
  }

  ul,
  ol {
    padding-left: 0;
    list-style: none;
  }

  address {
    font-style: normal;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-enter-active {
    opacity: 1;
    transition: opacity 200ms;
  }

  .modal-exit {
    opacity: 1;
  }

  .modal-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }

  .visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  // calendar
  .react-datepicker {
    border: none !important;
  }
  .react-datepicker__header {
    background-color: transparent !important;
    border-bottom: none !important;
  }
  .react-datepicker__day--in-range {
    background-color: #fffba7 !important;
    border-radius: 50% !important;
    color: black !important;
  }
  .react-datepicker__day--in-selecting-range {
    background: #fffba7 !important;
    color: black !important;
    border-radius: 50% !important;
  }
  .react-datepicker__day--in-selecting-range:hover {
    color: black !important;
  }
  .react-datepicker__day--selected {
    background: #ffe0b2 !important;
    color: black !important;
  }
  .react-datepicker__day--selected:hover {
    background: #ffe0b2 !important;
    border-radius: 50%;
    color: black !important;
  }
  .react-datepicker__day--selecting-range-start {
    background: #ffe0b2 !important;
    border-radius: 50%;
  }
  .react-datepicker__day--range-start {
    background: #ffe0b2 !important;
    border-radius: 50%;
  }
  .react-datepicker__day--range-end {
    background: #ffb84e !important;
    border-radius: 50% !important;
  }
  .react-datepicker__day--today {
    font-weight: normal !important;
  }
`;

export default GlobalStyle;
