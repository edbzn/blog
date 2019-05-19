import { css } from 'lit-element';

export const formStyle = css`
  .field {
    margin: 10px 0;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  .field input,
  .field textarea,
  .field select {
    box-sizing: border-box;
    margin-top: 6px;
    display: block;
    width: 100%;
    padding: 4px;
    border-radius: 2px;
    background: transparent;
    border: 1px solid #666;
  }

  .field input:focus,
  .field textarea:focus,
  .field select:focus {
    outline: 1px solid #666;
  }

  .label {
    font-size: 0.9rem;
  }
`;
