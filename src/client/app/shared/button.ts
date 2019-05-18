import { css } from 'lit-element';

export const buttonStyle = css`
  .button {
    font-family: 'IBM Plex Sans Condensed', sans-serif;
    color: #222;
    text-decoration: none;
    text-align: center;
    display: block;
    width: 100%;
    height: 42px;
    line-height: 42px;
    margin-top: 10px;
    border: 1px solid #eee;
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
    color: #222;
    font-size: 0.8rem;
    transition: 150ms ease;
  }

  .button:hover {
    background: #eee;
  }

  .button:focus {
    outline: none;
    border: 2px solid #eee;
  }
`;
