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
        <footer style={{ marginTop: rhythm(2), fontSize: 14, fontWeight: 100 }}>
          <div style={{ textAlign: 'center' }}>
            © {new Date().getFullYear()} - <strong>{title}</strong> - 
            <a href="https://twitter.com/edbzn">@edbzn</a> -
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
                  width: 14,
                  marginBottom: -2,
                  marginRight: 4,
                  marginLeft: 6,
                }}
              />{' '}
              RSS feed
            </a>
          </div>
          <div style={{ textAlign: 'center' }}>
            This website is under{' '}
            <a href="https://creativecommons.org/licenses/by-sa/4.0">
              CC BY-SA 4.0
            </a>{' '}
            license
          </div>
        </footer>
      </div>
    );
  }
}

export default Layout;
