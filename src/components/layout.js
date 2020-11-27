import { Link } from 'gatsby';
import React from 'react';
import CookieConsent from 'react-cookie-consent';
import rss from '../../static/icons/rss.svg';
import { rhythm } from '../utils/typography';

class Layout extends React.Component {
  render() {
    const { location, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
        <span
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
            <strong>codamit</strong>.dev
          </Link>
        </span>
      );
    } else {
      header = (
        <span
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
            <strong>codamit</strong>.dev
          </Link>
        </span>
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
        <CookieConsent
          location="bottom"
          enableDeclineButton
          flipButtons
          acceptOnScroll
          acceptOnScrollPercentage={50}
          cookieName="gatsby-gdpr-google-analytics"
          style={{
            background: 'rgba(53, 53, 53, 0.9)',
            fontFamily: 'Montserrat, sans-serif',
          }}
          buttonStyle={{ margin: 0 }}
        >
          This website uses cookies to analyze site traffic and improve user
          experience.
        </CookieConsent>
        <footer
          role="contentinfo"
          style={{ marginTop: rhythm(2), fontSize: 14, fontWeight: 100 }}
        >
          <div style={{ textAlign: 'center' }}>
            © {new Date().getFullYear()} - <strong>codamit</strong>.dev -
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
