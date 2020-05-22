import { Disqus } from 'gatsby-plugin-disqus';
import { graphql, Link } from 'gatsby';
import React from 'react';

import Bio from '../components/bio';
import Layout from '../components/layout';
import { SEO } from '../components/seo';
import { rhythm } from '../utils/typography';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { social, author, siteUrl } = this.props.data.site.siteMetadata;
    const { previous, next } = this.props.pageContext;
    const { path, location } = this.props;
    const disqusConfig = {
      url: siteUrl + path,
      identifier: post.id,
      title: post.title,
    };

    return (
      <Layout
        location={location}
        title={siteTitle}
        social={social}
        author={author}
      >
        <SEO
          title={post.frontmatter.title}
          description={post.excerpt}
          article={true}
          canonical={post.frontmatter.canonical}
        />
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                display: `block`,
                marginTop: rhythm(0.2),
                marginBottom: rhythm(2),
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            style={{ marginBottom: rhythm(2) }}
          />
          <footer>
            <Bio />
            <Disqus style={{ marginTop: rhythm(2) }} config={disqusConfig} />
          </footer>
        </article>
        <nav style={{ marginTop: rhythm(2) }}>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        social {
          twitter
          linkedin
          github
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        canonical
      }
    }
  }
`;
