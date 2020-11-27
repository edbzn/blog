import React from 'react';

import Layout from '../components/layout';
import { SEO } from '../components/seo';

class NotFoundPage extends React.Component {
  render() {
    const { social, author } = this.props.data.site.siteMetadata;

    return (
      <Layout location={this.props.location} social={social} author={author}>
        <SEO title="Page Not Found" />
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
    );
  }
}

export default NotFoundPage;
