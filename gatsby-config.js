module.exports = {
  siteMetadata: {
    title: `codamit.dev`,
    author: `Edouard Bozon`,
    description: `My technical blog where I share stuff about code, architecture and best practices. I'm mainly focused around JavaScript and TypeScript world.`,
    authorDescription: "I live between Lyon and Chamonix. I focus my work on crafting high quality apps and contributing to open source.",
    siteUrl: `https://wwww.codamit.dev`,
    social: {
      twitter: `https://twitter.com/edouardbozon`,
      github: `https://github.com/edouardbozon`,
      linkedin: `https://www.linkedin.com/in/edouardbozon`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-47975149-8`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `codamit.dev`,
        short_name: `codamit.dev`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#007acc`,
        display: `minimal-ui`,
        icon: `content/assets/me.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    }
  ],
}
