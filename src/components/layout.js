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
            marginBottom: 0,
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3
            style={{
              marginBottom: 0,
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
          <Link style={{ fontSize: 13 }} to={`/`}>
            ← back to home
          </Link>
        </div>
      );
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          marginTop: rhythm(1),
          marginBottom: rhythm(2),
          maxWidth: rhythm(26),
        }}
      >
        <header
          style={{
            background: '#fff',
            paddingBottom: 18,
            paddingTop: 18,
          }}
        >
          {header}
        </header>
        <main style={{ marginTop: rhythm(1) }}>{children}</main>
        <footer style={{ marginTop: rhythm(2) }}>
          © {new Date().getFullYear()} - <strong>{title}</strong> - {author} -{' '}
          <a
            href="/rss.xml"
            style={{
              boxShadow: `none`,
            }}
          >
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
