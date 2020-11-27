import { graphql, Link } from 'gatsby';
import React from 'react';
import Bio from '../components/bio';
import Layout from '../components/layout';
import { SEO } from '../components/seo';
import { rhythm } from '../utils/typography';

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const { siteMetadata } = data.site;
    const { social, author } = siteMetadata;
    const blogPosts = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} social={social} author={author}>
        <SEO title="All posts" />
        <Bio />
        <section role="main" style={{ marginTop: rhythm(2) }}>
          {blogPosts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <article
                key={node.fields.slug}
                style={{ marginTop: rhythm(1.6), marginBottom: rhythm(1.6) }}
              >
                <header>
                  <h3
                    style={{
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    <Link to={node.fields.slug}>{title}</Link>
                  </h3>
                </header>
                <section
                  style={{
                    marginTop: rhythm(1 / 4),
                    marginBottom: 0,
                  }}
                >
                  <p
                    style={{ marginBottom: 0 }}
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </section>
                <footer
                  style={{ marginTop: rhythm(1 / 6), fontWeight: 'lighter' }}
                >
                  <span style={{ fontSize: '14px' }}>
                    {node.frontmatter.draft ? (
                      <span>
                        <span role="img" aria-label="emoji" alt="wip">
                          🚧
                        </span>{' '}
                        Draft
                      </span>
                    ) : (
                      node.frontmatter.date
                    )}
                  </span>
                </footer>
              </article>
            );
          })}
        </section>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        social {
          twitter
          github
          linkedin
        }
      }
    }
    allMarkdownRemark(
      filter: { published: { eq: true } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            draft
          }
        }
      }
    }
  }
`;
