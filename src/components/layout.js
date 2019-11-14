import { Link } from 'gatsby';
import React from 'react';

import rss from '../../content/assets/icons/rss.svg';
import { rhythm } from '../utils/typography';

class Layout extends React.Component {
  render() {
    const { location, title, children, author } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            marginBottom: rhythm(1.5),
            marginTop: 0,
            fontFamily: "'Merriweather', 'Georgia', serif",
            fontSize: rhythm(0.9),
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      );
    } else {
      header = (
        <h3
          style={{
            marginBottom: rhythm(1.5),
            marginTop: 0,
            fontSize: rhythm(0.9),
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      );
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(26),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()} - <strong>{title}</strong> - {author} -{' '}
          <a href="/rss.xml">
            <img
              src={rss}
              alt="RSS feed icon"
              style={{
                width: 20,
                marginBottom: -5,
                marginRight: 4,
                marginLeft: 4,
              }}
            />{' '}
            RSS feed
          </a>
        </footer>
      </div>
    );
  }
}

export default Layout;
