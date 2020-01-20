import React from 'react';

import github from '../../static/icons/github.svg';
import linkedin from '../../static/icons/linkedin.svg';
import twitter from '../../static/icons/twitter.svg';
import gmail from '../../static/icons/gmail.svg';

export const Social = ({ social }) => {
  return (
    <div className="socials">
      <a href={social.twitter} title="@edbzn on Twitter">
        <img src={twitter} alt="Twitter profile" />
      </a>
      <a href={social.github} title="@edbzn on GitHub">
        <img src={github} alt="Github profile" />
      </a>
      <a href={social.devto} title="@edbzn on Dev.to">
        <img
          src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg"
          alt="Dev.to profile"
        />
      </a>
      <a href={social.linkedin} title="@edouardbozon on LinkedIn">
        <img src={linkedin} alt="Linkedin profile" />
      </a>
      <a title="Email me" href={'mailto:' + social.mail}>
        <img src={gmail} alt="Email me" />
      </a>
    </div>
  );
};
