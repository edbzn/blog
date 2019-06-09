import { css } from 'lit-element';

export const cardStyle = css`
  .card-link {
    display: block;
    margin-bottom: 1.5rem;
    color: #222;
    text-decoration: none;
  }

  .card {
    border: 1px solid #eee;
    border-radius: 8px;
    transition: 150ms ease;
  }

  .card:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
  }

  .card:last-child {
    margin-bottom: 0;
  }

  .card-header {
    font-family: 'IBM Plex Sans Condensed', sans-serif;
  }

  .card-header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0;
  }

  .card-header,
  .card-content,
  .card-footer {
    padding: 12px;
  }

  @media screen and (max-width: 800px) {
    .card-header-inner .left {
      margin-bottom: 4px;
    }
  }
`;
