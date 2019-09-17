import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <h1
              style={{
                ...scale(1.4),
                marginTop: rhythm(1),
                fontFamily: `'IBM Plex Serif', serif`,
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-0.4),
                display: `block`,
                marginTop: rhythm(0.2),
                marginBottom: rhythm(2),
                fontFamily: `'IBM Plex Sans', sans-serif`,
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            style={{
              marginBottom: rhythm(2),
            }}
          />
          <footer>
            <Bio />
          </footer>
        </article>

        <nav style={{ marginTop: rhythm(2) }}>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              fontFamily: `'IBM Plex Sans', sans-serif`,
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
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
