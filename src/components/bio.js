import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import React from "react"

import { rhythm } from "../utils/typography"
import { Social } from "./social"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/me.jpeg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          authorDescription
          social {
            twitter
            github
            linkedin
          }
        }
      }
    }
  `)

  const { author, social, authorDescription } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        padding: `${(0, rhythm(0.4))}`,
        border: "1px solid #eee",
        borderRadius: "4px",
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginTop: rhythm(0.1),
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <div style={{ margin: "0" }}>
        I'm <strong>{author}</strong>, {authorDescription}
        <div style={{ marginTop: rhythm(0.4) }}>
          <Social social={social} />
        </div>
      </div>
    </div>
  )
}

export default Bio
