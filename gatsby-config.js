module.exports = {
  siteMetadata: {
    siteUrl: `https://www.codamit.dev`,
    url: 'https://www.codamit.dev',
    title: 'codamit.dev',
    titleTemplate: '%s · codamit.dev',
    author: `Edouard Bozon`,
    description:
      "Edouard Bozon's tech blog about web development: Angular, Node.js, TypeScript, Javascript and more!",
    authorDescription:
      "I'm Edouard Bozon, I live in Lyon, France. I play almost everyday with Angular and Node. I focus my work on building better JavaScript apps and contributing to open source. I'm currently freelancer.",
    twitterUsername: '@edbzn',
    social: {
      twitter: `https://twitter.com/edbzn`,
      github: `https://github.com/edbzn`,
      linkedin: `https://www.linkedin.com/in/edouardbozon`,
      devto: `https://dev.to/edbzn`,
      mail: `bozonedouard@gmail.com`,
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
        path: `${__dirname}/static/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              usePrefix: true,
              providers: {
                include: ['Twitter'],
              },
            },
          },
          {
            resolve: `gatsby-remark-images`,
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
          `gatsby-remark-autolink-headers`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-47975149-8`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "codamit.dev's RSS Feed",
            match: '^/blog/',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `codamit.dev`,
        short_name: `codamit`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `static/icons/icon-512x512.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `codamit-dev`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.codamit.dev',
        sitemap: 'https://www.codamit.dev/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#000000`,
        showSpinner: true,
      },
    },
  ],
};
