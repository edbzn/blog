import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import React from "react"

import github from "../../content/assets/icons/github.svg"
import linkedin from "../../content/assets/icons/linkedin.svg"
import twitter from "../../content/assets/icons/twitter.svg"
import { rhythm } from "../utils/typography"

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
          social {
            twitter
            github
            linkedin
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
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
      <p style={{ margin: "0" }}>
        I'm <strong>{author}</strong>, I live between Lyon and Chamonix. I
        focus my work on crafting high quality apps and contributing to open source.
        <div style={{ marginTop: rhythm(0.2) }}>
          <a
            href={social.twitter}
            style={{ marginRight: rhythm(0.4), boxShadow: "none" }}
          >
            <img
              src={twitter}
              alt="Twitter profile"
              style={{ display: "inline-block", width: 24 }}
            />
          </a>
          <a
            href={social.github}
            style={{ marginRight: rhythm(0.4), boxShadow: "none" }}
          >
            <img
              src={github}
              alt="Github profile"
              style={{ display: "inline-block", width: 24 }}
            />
          </a>
          <a href={social.linkedin} style={{ boxShadow: "none" }}>
            <img
              src={linkedin}
              alt="Linkedin profile"
              style={{ display: "inline-block", width: 24 }}
            />
          </a>
        </div>
      </p>
    </div>
  )
}

export default Bio
