import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const style = {
  width: '48%',
  margin: '0 1%',
  padding: '1rem',
  border: '2px solid rgb(238, 238, 238)',
  borderRadius: '4px',
  fontFamily: 'Montserrat,sans-serif',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const PostNav = ({ previous, next }) => (
  <nav role="navigation">
    <ul
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        justifyContent: `space-between`,
        alignItems: 'stretch',
        listStyle: `none`,
        padding: 0,
      }}
    >
      {previous && (
        <li style={style}>
          <Link to={previous.fields.slug} rel="prev">
            {previous.frontmatter.title}
          </Link>
        </li>
      )}
      {next && (
        <li style={style}>
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title}
          </Link>
        </li>
      )}
    </ul>
  </nav>
);

PostNav.propTypes = {
  previous: PropTypes.object,
  next: PropTypes.object,
};
