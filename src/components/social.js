import React from "react"

import github from "../../content/assets/icons/github.svg"
import linkedin from "../../content/assets/icons/linkedin.svg"
import twitter from "../../content/assets/icons/twitter.svg"
import { rhythm } from "../utils/typography"

export const Social = ({ social }) => {
  return (
    <>
      <a
        href={social.twitter}
        style={{ marginRight: rhythm(0.4), boxShadow: "none" }}
      >
        <img
          src={twitter}
          alt="Twitter profile"
          style={{ display: "inline-block", width: 24, marginBottom: 0 }}
        />
      </a>
      <a
        href={social.github}
        style={{ marginRight: rhythm(0.4), boxShadow: "none" }}
      >
        <img
          src={github}
          alt="Github profile"
          style={{ display: "inline-block", width: 24, marginBottom: 0 }}
        />
      </a>
      <a href={social.linkedin} style={{ boxShadow: "none" }}>
        <img
          src={linkedin}
          alt="Linkedin profile"
          style={{ display: "inline-block", width: 24, marginBottom: 0 }}
        />
      </a>
    </>
  )
}
