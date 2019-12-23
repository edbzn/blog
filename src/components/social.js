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
        href={social.twitter}
        title="@edbzn on Twitter"
        style={{ marginRight: rhythm(0.5), boxShadow: 'none' }}
      >
        <img
          src={twitter}
          alt="Twitter profile"
          style={{ display: 'inline-block', width: 24, marginBottom: 0 }}
        />
      </a>
      <a
        href={social.github}
        title="@edbzn on GitHub"
        style={{ marginRight: rhythm(0.5), boxShadow: 'none' }}
      >
        <img
          src={github}
          alt="Github profile"
          style={{ display: 'inline-block', width: 24, marginBottom: 0 }}
        />
      </a>
      <a
        href={social.linkedin}
        title="@edouardbozon on LinkedIn"
        style={{ marginRight: rhythm(0.5), boxShadow: 'none' }}
      >
        <img
          src={linkedin}
          alt="Linkedin profile"
          style={{ display: 'inline-block', width: 24, marginBottom: 0 }}
        />
      </a>
      <a
        title="Email me"
        href={'mailto:' + social.mail}
        style={{ boxShadow: 'none' }}
      >
        <img
          src={gmail}
          alt="Email me"
          style={{ display: 'inline-block', width: 24, marginBottom: 0 }}
        />
      </a>
    </>
  );
};
