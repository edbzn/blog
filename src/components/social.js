import React from 'react';

import github from '../../content/assets/icons/github.svg';
import linkedin from '../../content/assets/icons/linkedin.svg';
import twitter from '../../content/assets/icons/twitter.svg';
import gmail from '../../content/assets/icons/gmail.svg';
import { rhythm } from '../utils/typography';

export const Social = ({ social }) => {
  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={social.twitter}
        style={{ marginRight: rhythm(0.5), boxShadow: 'none' }}
      >
        <img
          src={twitter}
          alt="Twitter profile"
          style={{ display: 'inline-block', width: 24, marginBottom: 0 }}
        />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={social.github}
        style={{ marginRight: rhythm(0.5), boxShadow: 'none' }}
      >
        <img
          src={github}
          alt="Github profile"
          style={{ display: 'inline-block', width: 24, marginBottom: 0 }}
        />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={social.linkedin}
        style={{ marginRight: rhythm(0.5), boxShadow: 'none' }}
      >
        <img
          src={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          alt="Linkedin profile"
          style={{ display: 'inline-block', width: 24, marginBottom: 0 }}
        />
      </a>
      <a href={'mailto:' + social.mail} style={{ boxShadow: 'none' }}>
        <img
          src={gmail}
          alt="Email me"
          style={{ display: 'inline-block', width: 24, marginBottom: 0 }}
        />
      </a>
    </>
  );
};
