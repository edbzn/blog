const path = require(`path`);
const { GraphQLBoolean } = require('gatsby/graphql');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              published
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach((post, index) => {
    const hasNext = index > 0;
    const hasPrevious = index < posts.length - 1;

    const nextNode = hasNext ? posts[index - 1].node : null;
    const previousNode = hasPrevious ? posts[index + 1].node : null;

    const next = hasNext && nextNode.published ? nextNode : null;
    const previous =
      hasPrevious && previousNode.published ? previousNode : null;

    if (!post.node.published) {
      return;
    }

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if ('MarkdownRemark' === type.name) {
    return {
      published: {
        type: GraphQLBoolean,
        resolve: ({ frontmatter }) => {
          if (process.env.NODE_ENV !== 'production') {
            return true;
          }

          return !frontmatter.draft;
        },
      },
    };
  }
  return {};
};
