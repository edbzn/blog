import { css } from 'lit-element';

export const buttonStyle = css`
  .button {
    font-family: 'IBM Plex Sans Condensed', sans-serif;
    font-size: 0.9rem;
    color: #222;
    text-decoration: none;
    text-align: center;
    display: block;
    width: 100%;
    height: 36px;
    line-height: 36px;
    margin-top: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    color: #222;
    font-size: 0.8rem;
    transition: 150ms ease;
  }

  .button:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
  }

  .button:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
  }

  .button[disabled] {
    color: #666;
    cursor: initial;
  }

  .button[disabled]:hover {
    outline: none;
    box-shadow: none;
  }
`;
